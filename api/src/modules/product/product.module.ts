import { diskStorage } from 'multer';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from '../users/users.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './src/shared/uploads',
        filename: (request, file, callback) => {
          callback(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
