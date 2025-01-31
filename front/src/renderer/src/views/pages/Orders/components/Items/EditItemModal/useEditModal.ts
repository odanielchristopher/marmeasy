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

        // function handleConfirmDelete(index: number) {
    //   {editIndex !== null && deleteOrderDetail(index);}
    //   setIsDeleteModalOpen(false);
    // }

    // function deleteOrderDetail(index: number) {
    //   setOrderDetails((prevDetails) => {
    //     return prevDetails.filter((_, i) => i !== index);
    //   });
    // };

  // const { mutateAsync: updateItem, isPending: isLoading } = useMutation({
  //   mutationFn: async (data: UpdateItem) =>
  //     ordersService.update(data),
  //   onSuccess: (updatedItem: OrderDetail) => {
  //     queryClient.setQueryData(
  //       ['orders', 'getAll'],
  //       (currentItems: OrderDetail[]) => {
  //         return currentItems.map((item) =>
  //           item.productName === updatedItem.productName ? updatedItem : item,
  //         );
  //       },
  //     );
  //   },
  // });

  // async function handleSubmit(data: OrderDetail) {
  //   try {
  //     await updateItem({
  //       ...data,
  //       name: data.productName,
  //       ingredients: data.selectedIngredients.map(ingredient => ingredient.name),
  //       unitPrice: data.productPrice,
  //       total: data.totalPrice,
  //     });
  //     toast({
  //       type: 'success',
  //       text: 'Item editado com sucesso.',
  //     });
  //     onSuccess();
  //   } catch {
  //     toast({
  //       type: 'danger',
  //       text: 'Ocorreu um error ao editar o item.',
  //     });
  //   }
  // }

  // return {
  //   handleSubmit,
  //   isLoading,
  // };
}
