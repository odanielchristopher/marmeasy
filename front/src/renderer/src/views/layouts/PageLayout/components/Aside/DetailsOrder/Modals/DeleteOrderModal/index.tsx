import { Order } from '@renderer/app/entities/Order';
import { formatCurrency } from '@renderer/app/utils/formatCurrency';
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

export default function DelteOrderModal({
  isOpen,
  onClose,
  order,
  handleHiddenOrderData,
}: DelteOrderModalProps) {
  const { handleDeleteOrder, isDeleting, findClientById } = useDeleteOrderModal(
    onClose,
    handleHiddenOrderData,
  );
  return (
    <Modal open={isOpen} title="Deletar pedido" onClose={onClose}>
      <Container>
        <p>
          Tem certeza que deseja <strong>deletar</strong> o pedido?
        </p>
        <span>Aqui estão algumas informações úteis sobre o pedido:</span>
        <div className="infoOrder">
          <div className="left">
            <p>Nome do cliente: </p>
            <p>Valor do pedido: </p>
            <p>Quantidade de itens: </p>
          </div>
          <div className="right">
            <strong>{findClientById(order.clientId)?.name}</strong>
            <strong>R$ {formatCurrency(order.totalValue)}</strong>
            <strong>{order.items.length}</strong>
          </div>
        </div>
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
