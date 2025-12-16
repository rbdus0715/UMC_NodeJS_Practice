import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as NaverStrategy } from 'passport-naver';
import jwt from 'jsonwebtoken'; 
import prisma from './db.config';
import { ulid } from 'ulid';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

dotenv.config();
const secret = process.env.JWT_SECRET; 

type User = {
  id: string;
  email: string | null;
  name: string | null;
};

export const generateAccessToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, String(secret), {
    expiresIn: '1h',
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign({ id: user.id }, String(secret), { expiresIn: '14d' });
};

type Profile = {
  emails: [
    {
      value: string;
      type: string;
    }
  ];
  displayName: string;
};

const googleVerify = async (profile: Profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    // 기존 사용자가 다른 인증 방식으로 가입했는지 확인
    const authProvider = (user as any).auth_provider;
    if (authProvider !== 'GOOGLE') {
      throw new Error(`이 이메일은 ${authProvider === 'EMAIL' ? '이메일/비밀번호' : authProvider === 'NAVER' ? 'Naver' : '다른'} 로그인으로 가입되었습니다. ${authProvider === 'EMAIL' ? '이메일/비밀번호' : authProvider === 'NAVER' ? 'Naver' : '해당'} 로그인을 사용해주세요.`);
    }
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      id: ulid(),
      nickname: profile.displayName,
      password: '1234', // 필요 없음
      gender: 'NONE',
      email: profile.emails?.[0]?.value,
      auth_provider: 'GOOGLE' as any,
    } as any,
  });

  return { id: created.id, email: created.email, name: created.name };
};

type NaverProfile = {
  emails: [
    {
      value: string;
    }
  ];
  displayName: string;
  _json?: {
    email?: string;
    name?: string;
    nickname?: string;
  };
};

const naverVerify = async (profile: NaverProfile) => {
  const email = profile.emails?.[0]?.value || profile._json?.email;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    // 기존 사용자가 다른 인증 방식으로 가입했는지 확인
    const authProvider = (user as any).auth_provider;
    if (authProvider !== 'NAVER') {
      throw new Error(`이 이메일은 ${authProvider === 'EMAIL' ? '이메일/비밀번호' : authProvider === 'GOOGLE' ? 'Google' : '다른'} 로그인으로 가입되었습니다. ${authProvider === 'EMAIL' ? '이메일/비밀번호' : authProvider === 'GOOGLE' ? 'Google' : '해당'} 로그인을 사용해주세요.`);
    }
    return { id: user.id, email: user.email, name: user.name };
  }

  const displayName = profile.displayName || profile._json?.name || profile._json?.nickname || 'User';

  const created = await prisma.user.create({
    data: {
      id: ulid(),
      nickname: displayName,
      password: '1234', // 필요 없음
      gender: 'NONE',
      email: email,
      auth_provider: 'NAVER' as any,
    } as any,
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: String(process.env.PASSPORT_GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.PASSPORT_GOOGLE_CLIENT_SECRET),
    callbackURL: '/oauth2/callback/google',
    scope: ['email', 'profile'],
  },
  async (accessToken, refreshToken, profile: any, cb) => {
    try {
      const user = await googleVerify(profile);
      const jwtAccessToken = generateAccessToken(user);
      const jwtRefreshToken = generateAccessToken(user);

      return cb(null, {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      });
    } catch (err) {
      return cb(err);
    }
  }
);

export const naverStrategy = new NaverStrategy(
  {
    clientID: String(process.env.PASSPORT_NAVER_CLIENT_ID),
    clientSecret: String(process.env.PASSPORT_NAVER_CLIENT_SECRET),
    callbackURL: '/oauth2/callback/naver',
  },
  async (accessToken: string, refreshToken: string, profile: any, cb: (error: any, user?: any) => void) => {
    try {
      const user = await naverVerify(profile);
      const jwtAccessToken = generateAccessToken(user);
      const jwtRefreshToken = generateAccessToken(user);

      return cb(null, {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      });
    } catch (err) {
      return cb(err);
    }
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: String(process.env.JWT_SECRET),
};

type VerifiedCallback = (
  error: any,
  user?: Express.User | false | null,
  info?: any
) => void;

export const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload: { id: string }, done: VerifiedCallback) => {
    try {
      const user = await prisma.user.findFirst({ where: { id: payload.id } });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
);
