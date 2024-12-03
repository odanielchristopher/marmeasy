import { useCallback, useState } from 'react';

export default function useAnimatedList<T extends { id: number }>(initialValue: T[] = []) {
  const [items, setItems] = useState<T[]>(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id]
    );
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((itemId) => itemId !== id)
    );
  }, []);

  return {
    items,
    pendingRemovalItemsIds,
    setItems,
    handleRemoveItem,
    handleAnimationEnd
  };
}
