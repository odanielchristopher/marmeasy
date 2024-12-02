import { IToastMessage } from '@renderer/components/Toast/ToastMessage';

export default function toast({ type, text }: IToastMessage) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text
    }
  });
  document.dispatchEvent(event);
}
