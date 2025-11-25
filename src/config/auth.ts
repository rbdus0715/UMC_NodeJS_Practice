import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken'; // JWT 생성을 위해 import
import prisma from './db.config';
import { ulid } from 'ulid';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

dotenv.config();
const secret = process.env.JWT_SECRET; // .env의 비밀 키

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
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      id: ulid(),
      nickname: profile.displayName,
      password: '1234', // 필요 없음
      gender: 'NONE',
      email: profile.emails?.[0]?.value,
    },
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
