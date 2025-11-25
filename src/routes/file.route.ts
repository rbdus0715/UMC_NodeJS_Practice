import { Router, Request, Response } from 'express';
import upload from '../apis/file/file.service';

const fileRouter = Router();

// 단일 파일 업로드
fileRouter.post(
  '/upload',
  // #swagger.tags = ['File']
  // #swagger.summary = '단일 파일 업로드'
  // #swagger.description = '단일 파일을 업로드합니다.'
  // #swagger.consumes = ['multipart/form-data']
  /* #swagger.parameters['file'] = {
    in: 'formData',
    type: 'file',
    required: true,
    description: '업로드할 파일'
  } */
  /* #swagger.responses[200] = {
    description: '파일 업로드 성공',
    schema: {
      filePath: '/public/uploads/filename.ext'
    }
  } */
  /* #swagger.responses[400] = {
    description: '파일 업로드 실패',
    schema: {
      message: '파일이 업로드되지 않았습니다.'
    }
  } */
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
  // #swagger.tags = ['File']
  // #swagger.summary = '다중 파일 업로드'
  // #swagger.description = '여러 파일을 업로드합니다. (최대 5개)'
  // #swagger.consumes = ['multipart/form-data']
  /* #swagger.parameters['files'] = {
    in: 'formData',
    type: 'array',
    items: {
      type: 'file'
    },
    required: true,
    description: '업로드할 파일들 (최대 5개)'
  } */
  /* #swagger.responses[200] = {
    description: '파일 업로드 성공',
    schema: {
      files: ['/public/uploads/filename1.ext', '/public/uploads/filename2.ext']
    }
  } */
  upload.array('files', 5),
  (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const paths = files.map((f) => `/public/uploads/${f.filename}`);
    res.json({ files: paths });
  }
);

export default fileRouter;
