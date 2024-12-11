import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export default function useAnimatedList<T extends { id: number }>(initialValue: T[] = []) {
  const [items, setItems] = useState<T[]>(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState<number[]>([]);

  const animatedRefs = useRef(new Map<number, React.RefObject<HTMLDivElement>>());
  const animationEndListeners= useRef(new Map<number, () => void>());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);

    if (removeListener) {
      removeListener();
      animationEndListeners.current.delete(itemId);
      animatedRefs.current.delete(itemId);
    }

    setItems((prevState) => prevState.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds(
      (prevState) => prevState.filter((id) => itemId !== id)
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListeners = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListeners) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);

        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);
        animationEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds(
      (prevState) => [...prevState, id]
    );
  }, []);

  const getAnimatedRef = useCallback((itemId: number) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  // eslint-disable-next-line no-unused-vars
  const renderList= useCallback((renderItem: (item: T,  { isLeaving, animatedRef }) => JSX.Element) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    renderList,
    handleRemoveItem
  };
}
