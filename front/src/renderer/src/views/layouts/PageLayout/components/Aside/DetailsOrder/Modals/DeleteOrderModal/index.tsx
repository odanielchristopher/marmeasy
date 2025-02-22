import { Order } from '@renderer/app/entities/Order';
import Button from '@renderer/views/components/Button';
import Modal from '@renderer/views/components/Modal';
import { Container } from './styles';
import useDeleteOrderModal from './useDeleteOrderModal';

interface DelteOrderModalProps {
    isOpen: boolean;
    onClose(): void;
    order: Order;
    handleHiddenOrderData(): void;
}

export default function DelteOrderModal({ isOpen, onClose, order, handleHiddenOrderData }: DelteOrderModalProps) {
    const {
      handleDeleteOrder,
      isDeleting,
     } = useDeleteOrderModal(onClose, handleHiddenOrderData);
    return (
        <Modal open={isOpen} title="Deletar pedido" onClose={onClose}>
            <Container>
                <p>Tem certeza que deseja deletar o pedido?</p>
                <footer>
                    <Button
                      onClick={() => handleDeleteOrder(order.id)}
                      isLoading={isDeleting}
                    >
                        <strong>Deletar Pedido</strong>
                    </Button>
                </footer>
            </Container>
        </Modal>
    );
}
