import { Router, Request, Response } from 'express';
import passport from 'passport';

const oauthRouter = Router();

// Google OAuth 로그인 시작
oauthRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  // #swagger.tags = ['OAuth']
  // #swagger.summary = 'Google 로그인 시작'
  // #swagger.description = 'Google OAuth 로그인을 시작합니다.'
);

// Google OAuth 콜백
oauthRouter.get(
  '/callback/google',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as { accessToken: string; refreshToken: string };
    // 토큰을 쿼리 파라미터로 리다이렉트하거나, 프론트엔드로 전달
    res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?accessToken=${user.accessToken}&refreshToken=${user.refreshToken}`
    );
  }
);

// Naver OAuth 로그인 시작
oauthRouter.get(
  '/naver',
  passport.authenticate('naver'),
  // #swagger.tags = ['OAuth']
  // #swagger.summary = 'Naver 로그인 시작'
  // #swagger.description = 'Naver OAuth 로그인을 시작합니다.'
);

// Naver OAuth 콜백
oauthRouter.get(
  '/callback/naver',
  passport.authenticate('naver', { session: false }),
  (req: Request, res: Response) => {
    const user = req.user as { accessToken: string; refreshToken: string };
    // 토큰을 쿼리 파라미터로 리다이렉트하거나, 프론트엔드로 전달
    res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?accessToken=${user.accessToken}&refreshToken=${user.refreshToken}`
    );
  }
);

export default oauthRouter;

