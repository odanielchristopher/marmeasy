import { Product } from '@renderer/app/entities/Product';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';

import noImage from '@renderer/assets/Images/empty-image.svg';

import {
  Actions,
  CancelButton,
  Container,
  Infos,
  ProductContainer,
  Warning,
} from './styles';

import useDeleteProductModal from './useDeleteProductModal';

interface DeleteProductModalProps {
  open: boolean;
  onClose(): void;
  product: Product | null;
}

export default function DeleteProductModal({
  open,
  onClose,
  product,
}: DeleteProductModalProps) {
  const { isLoading, handleDeleteProduct } = useDeleteProductModal(
    onClose,
    product,
  );

  const imagePath =
    product?.imagePath &&
    `${import.meta.env.VITE_API_URL}/${product?.imagePath}`;

  return (
    <Modal title="Excluir produto" open={open} onClose={onClose}>
      <Container>
        <Warning>Tem certeza que deseja excluir o produto?</Warning>

       <ProductContainer>
        <img src={imagePath || noImage} alt={product?.description} />
        <Infos>
          <div className='category'>
            <span>{product?.category?.icon}</span>
            <span>{capitalizeFirstLetter(product?.category?.name || '')}</span>
          </div>

            <p className="name">{capitalizeFirstLetter(product?.name || '')}</p>

            <span className="price">
              R$ {formatCurrency(product?.price || 0)}
            </span>
          </Infos>
        </ProductContainer>

        <Actions>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <Button
            danger
            isLoading={isLoading}
            onClick={handleDeleteProduct}
            className="delete"
          >
            Sim, desejo excluir
          </Button>
        </Actions>
      </Container>
    </Modal>
  );
}
