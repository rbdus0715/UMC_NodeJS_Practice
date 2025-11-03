import { Router, Request, Response } from 'express';
import upload from '../apis/files/files.service';

const fileRouter = Router();

// 단일 파일 업로드
fileRouter.post(
  '/upload',
  upload.single('file'),
  (req: Request, res: Response) => {
    // req.file에 업로드 정보 있음
    if (!req.file) {
      return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
    }

    res.json({ filePath: `/public/uploads/${req.file.filename}` });
  }
);

// 다중 파일 업로드
fileRouter.post(
  '/uploads',
  upload.array('files', 5),
  (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const paths = files.map((f) => `/public/uploads/${f.filename}`);
    res.json({ files: paths });
  }
);

export default fileRouter;
