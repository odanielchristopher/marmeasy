import { ImageIcon } from '@renderer/assets/Icons/ImageIcon';
import Dropzone from 'react-dropzone';
import { Container, ContainerImg, Preview } from './styles';

import { RxCrossCircled } from 'react-icons/rx';

import emptyImg from '@renderer/assets/Images/empty-image.svg';

interface UploadImageProps {
  previewImageUrl: string | undefined;
  onUpload<T extends File>(file: T[]): void;
  onRemoveImg?(): void;
}

export default function UploadImage({
  previewImageUrl,
  onUpload,
  onRemoveImg,
}: UploadImageProps) {
  return (
    <Container>
      {previewImageUrl && onRemoveImg && (
        <button className="remove" onClick={onRemoveImg}>
          <RxCrossCircled size={24} />
        </button>
      )}
      <Preview src={previewImageUrl || emptyImg} />

      <Dropzone
        accept={{
          'image/*': [],
        }}
        onDropAccepted={onUpload}
        maxFiles={1}
        noClick
      >
        {({ getRootProps, getInputProps, open }) => (
          <ContainerImg {...getRootProps()}>
            <input {...getInputProps()} />

            <button type="button" onClick={open}>
              <ImageIcon color="#DF6F28" />
              Alterar imagem
            </button>
          </ContainerImg>
        )}
      </Dropzone>
    </Container>
  );
}
