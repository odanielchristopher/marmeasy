import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { randomUUID } from 'node:crypto';
import * as path from 'path';

@Injectable()
export class ProducImagesService {
  async upload(image: Express.Multer.File) {
    if (!image.mimetype.startsWith('image/')) {
      throw new BadRequestException('Formato de arquivo inválido.');
    }

    // Salvar o arquivo no disco apenas após a validação
    const uploadDirectory = path.resolve(process.cwd(), 'uploads');

    const imageName = `${randomUUID()}-${image.originalname}`;

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
