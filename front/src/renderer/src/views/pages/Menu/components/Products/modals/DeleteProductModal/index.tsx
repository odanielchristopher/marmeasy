import { Product } from '@renderer/app/entities/Product';
import { capitalizeFirstLetter } from '@renderer/app/utils/capitalizeFirstLetter';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';
import { Actions, CancelButton, Container, Infos, ProductContainer, Warning } from './styles';
import useDeleteProductModal from './useDeleteProductModal';

interface DeleteProductModalProps {
  open: boolean;
  onClose(): void;
  product: Product | null;
}

export default function DeleteProductModal({ open, onClose, product }: DeleteProductModalProps) {
  const {
    isLoading,
    handleDeleteProduct,
  } = useDeleteProductModal(onClose, product);

  return (
    <Modal
      title="Excluir produto"
      open={open}
      onClose={onClose}
    >
      <Container>
       <Warning>
        Tem certeza que deseja excluir o produto?
       </Warning>

       <ProductContainer>
        <img src={`${import.meta.env.VITE_API_URL}/${product?.imagePath}`} alt={product?.description} />
        <Infos>
          <div className='category'>
            <span>{product?.category.icon}</span>
            <span>{capitalizeFirstLetter(product?.category.name || '')}</span>
          </div>

          <p className='name'>{capitalizeFirstLetter(product?.name || '')}</p>

          <span className='price'>R$ {formatCurrency(product?.price || 0)}</span>
        </Infos>
       </ProductContainer>

       <Actions>
          <CancelButton onClick={onClose}>
            Cancelar
          </CancelButton>
          <Button danger isLoading={isLoading} onClick={handleDeleteProduct}>
              Sim, desejo excluir
          </Button>
       </Actions>
      </Container>
    </Modal>
  );
}
