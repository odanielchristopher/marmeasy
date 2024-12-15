import { Container } from './styles';

import frase from '/frase.png?url';

interface AsideProps {
  area: string;
}

export default function Aside({ area }: AsideProps) {
  return (
    <Container $area={area}>
      <img src={frase} alt='' />

    </Container >
  );
}
