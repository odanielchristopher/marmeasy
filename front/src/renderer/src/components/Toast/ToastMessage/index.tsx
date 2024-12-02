import { Container } from './styles';

import { CgCloseO } from 'react-icons/cg';
import { FaRegCircleCheck } from 'react-icons/fa6';


type ToastType = 'default' | 'danger' | 'sucess';

export interface IToastMessage {
  id?: number
  text: string
  type: ToastType
}

export default function ToastMessage({ text, type }: IToastMessage): JSX.Element {
  return (
    <Container type={type}>
      {type === 'sucess' && <FaRegCircleCheck size={20}/>}
      {type === 'danger' && <CgCloseO size={22}/>}
      <strong>{text}</strong>
    </Container>
  );
}
