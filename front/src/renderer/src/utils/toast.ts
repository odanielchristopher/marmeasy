import { IToastMessage } from '@renderer/components/Toast/ToastMessage';
import EventManager from '@renderer/lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast({ type, text }: IToastMessage) {
  toastEventManager.emit('addtoast', { type, text });
}
