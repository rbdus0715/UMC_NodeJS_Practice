import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads')); // public/uploads 폴더에 저장
  },
  filename: function (req, file, cb) {
    // 파일 이름 중복 방지
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });
export default upload;
