import { ToastType } from '@renderer/components/Toast/ToastMessage';
import EventManager from '@renderer/lib/EventManager';

export const toastEventManager = new EventManager();

interface IToast {
  type: ToastType
  text: string
  duration?: number
}

export default function toast({ type, text, duration }: IToast) {
  toastEventManager.emit('addtoast', { type, text, duration });
}