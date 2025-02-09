import { OrderDetail } from '../ItemForm/useItemForm';


export default function useEditModal(
  index: number,
  onClose: () => void,
  setOrderDetails: (details: OrderDetail[]) => void,
  OrderDetails: OrderDetail[],
) {

    function editOrderDetail(index: number, OrderDetailsUpdated: OrderDetail) {
      const Order = OrderDetails.map((detail, i) => i === index ? OrderDetailsUpdated : detail);
      setOrderDetails(Order);
    };

    function handleConfimEdit(OrderDetailsUpdated: OrderDetail) {
      {index !== null && editOrderDetail(index, OrderDetailsUpdated);}
      onClose();
    }

    return {
      index,
      handleConfimEdit,
    };
}
