import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UploadService {
  async uploadFile(userId: string, image: Express.Multer.File) {
    if (!image.mimetype.startsWith('image/')) {
      throw new BadRequestException('Formato de arquivo inválido.');
    }

    // Salvar o arquivo no disco apenas após a validação
    const uploadDirectory = path.resolve(process.cwd(), 'uploads');

    const imageName = `${userId}-${Date.now()}-${image.originalname}`;

    const uploadPath = path.join(uploadDirectory, imageName);

    // Garantir que o diretório exista
    await fs.mkdir(uploadDirectory, { recursive: true });

    // Salvar o arquivo
    await fs.writeFile(uploadPath, image.buffer);

    return {
      imagePath: path.relative(process.cwd(), uploadPath),
    };
  }
}
