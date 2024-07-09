// import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import { extname } from 'path';

// export const multerOptions: MulterOptions = {
//   storage: diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//       const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
//       cb(null, uniqueSuffix);
//     },
//   }),
//   limits: {
//     fileSize: 1024 * 1024 * 5, // จำกัดขนาดไฟล์ 5MB
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Unsupported file type'), false);
//     }
//   },
// };