export const IProducImagesService = Symbol('IProducImagesService');

export type MessageResponse = {
  message: string;
};

export type ImageReponse = {
  imagePath: string;
};

export interface IProducImagesService {
  upload(image: Express.Multer.File): Promise<ImageReponse>;

  update(
    oldImagePath: string,
    newImage: Express.Multer.File,
  ): Promise<ImageReponse>;

  remove(imagePath: string): Promise<MessageResponse>;
}
