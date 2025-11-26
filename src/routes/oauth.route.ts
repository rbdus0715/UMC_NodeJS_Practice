import { Router, Request, Response } from 'express';
import passport from 'passport';

const oauthRouter = Router();

oauthRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  // #swagger.tags = ['OAuth']
  // #swagger.summary = 'Google 로그인 시작'
  // #swagger.description = 'Google OAuth 로그인을 시작합니다.'
);

oauthRouter.get(
  '/callback/google',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as { accessToken: string; refreshToken: string };
    
    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${user.refreshToken}; Path=/; HttpOnly; Secure; SameSite=None`
      );
    } else {
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${user.refreshToken}; Path=/; HttpOnly`
      );
    }
    
    // AccessToken은 전달하지 않고, 프론트엔드에서 RefreshToken으로 발급받도록 리다이렉트
    res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback`
    );
  }
);

oauthRouter.get(
  '/naver',
  passport.authenticate('naver'),
  // #swagger.tags = ['OAuth']
  // #swagger.summary = 'Naver 로그인 시작'
  // #swagger.description = 'Naver OAuth 로그인을 시작합니다.'
);

oauthRouter.get(
  '/callback/naver',
  passport.authenticate('naver', { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as { accessToken: string; refreshToken: string };
    
    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${user.refreshToken}; Path=/; HttpOnly; Secure; SameSite=None`
      );
    } else {
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${user.refreshToken}; Path=/; HttpOnly`
      );
    }
    
    res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback`
    );
  }
);

export default oauthRouter;

