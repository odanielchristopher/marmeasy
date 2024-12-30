import { Product } from '@renderer/app/entities/Product';
import Modal from '@renderer/views/components/Modal';
import { useState } from 'react';
import UploadImage from '../UploadImage';
import { Container, ImageSection } from './styles';

interface EditProductModalProps {
  open: boolean;
  onClose?(): void;
  product: Product | null;
}

export default function EditProductModal({ open, onClose, product }: EditProductModalProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(undefined);

  async function handleUploadImage<T extends File>([image]: T[]) {
    setPreviewImageUrl(URL.createObjectURL(image));

  }

  return (
    <Modal
      title="Editar produto"
      open={open}
      onClose={onClose}
      $maxWidth='92.8rem'
    >
      <Container>
        <ImageSection>
          <h3>Imagem</h3>

          <UploadImage
            onUpload={handleUploadImage}
            previewImageUrl={previewImageUrl || `${import.meta.env.VITE_API_URL}/${product?.imagePath}`}
          />
        </ImageSection>
      </Container>
    </Modal>
  );
}
