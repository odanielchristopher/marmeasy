import { paymentsService } from '@app/services/paymentsService';
import { GetAllPaymentsParams } from '@app/services/paymentsService/@types/GetAllPaymentsFn';

import { useInfiniteScroll } from '../useInfiniteScroll';

type UsePaymentsParams = {
  customerId: string;
  params: GetAllPaymentsParams;
};

export function usePayments({
  customerId,
  params: { perPage = 20, ...params },
}: UsePaymentsParams) {
  const {
    data: infiniteData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll({
    perPage,
    queryKey: ['payments', customerId, { perPage, ...params }],
    infiniteLoader: () =>
      paymentsService.getAll(customerId, { perPage, ...params }),
  });

  return {
    payments: infiniteData?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    infiniteScroll: {
      nextPage: fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
  };
}
