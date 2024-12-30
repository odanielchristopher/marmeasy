import { EmptyImage } from '@renderer/assets/Icons/EmptyImage';
import { ImageIcon } from '@renderer/assets/Icons/ImageIcon';
import Dropzone from 'react-dropzone';
import { Container, ContainerImg, NoContentImage, Preview } from './styles';

interface UploadImageProps {
  previewImageUrl: string | undefined;
  onUpload<T extends File>(file: T[]) : void;
}

export default function UploadImage({ previewImageUrl, onUpload }: UploadImageProps) {
  return (
    <Container>
      { previewImageUrl
          ? (<Preview src={previewImageUrl}/>)
          : (<NoContentImage> <EmptyImage /> </NoContentImage>)
      }

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
              <ImageIcon />
              Alterar imagem
            </button>
          </ContainerImg>
        )}
      </Dropzone>
    </Container>
  );
}
