import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import { randomUUID } from 'node:crypto';
import * as path from 'path';

@Injectable()
export class ProducImagesService {
  private readonly uploadDirectory = path.resolve(process.cwd(), 'uploads');

  async upload(image: Express.Multer.File) {
    if (!image.mimetype.startsWith('image/')) {
      throw new BadRequestException('Formato de arquivo inválido.');
    }

    const imageName = `${randomUUID()}-${image.originalname}`;
    const uploadPath = path.join(this.uploadDirectory, imageName);

    await fs.mkdir(this.uploadDirectory, { recursive: true });
    await fs.writeFile(uploadPath, image.buffer);

    return {
      imagePath: path.relative(process.cwd(), uploadPath),
    };
  }

  async update(oldImagePath: string, newImage: Express.Multer.File) {
    if (!newImage.mimetype.startsWith('image/')) {
      throw new BadRequestException('Formato de arquivo inválido.');
    }

    if (oldImagePath) {
      const oldImageFullPath = path.resolve(process.cwd(), oldImagePath);

      try {
        // Verificar se o arquivo original existe
        await fs.access(oldImageFullPath);
      } catch {
        throw new NotFoundException('Imagem antiga não encontrada.');
      }

      // Excluir a imagem antiga
      await fs.unlink(oldImageFullPath);
    }

    // Salvar a nova imagem
    const imageName = `${randomUUID()}-${newImage.originalname}`;
    const newUploadPath = path.join(this.uploadDirectory, imageName);

    await fs.writeFile(newUploadPath, newImage.buffer);

    return {
      imagePath: path.relative(process.cwd(), newUploadPath),
    };
  }

  async remove(imagePath: string) {
    const fullImagePath = path.resolve(process.cwd(), imagePath);

    try {
      // Verificar se o arquivo existe
      await fs.access(fullImagePath);
    } catch {
      throw new NotFoundException('Imagem não encontrada.');
    }

    // Remover o arquivo
    await fs.unlink(fullImagePath);

    return { message: 'Imagem removida com sucesso.' };
  }
}
