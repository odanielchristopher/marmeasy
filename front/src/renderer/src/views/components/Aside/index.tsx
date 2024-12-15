import { AsideContainer, Container } from './styles';
import { TbReportSearch } from 'react-icons/tb';

import frase from '/frase.png?url';

export default function Aside() {
  return (
    <AsideContainer>
      <img src={frase} alt='' />
      <Container>
        <TbReportSearch className='search' />
        <h2>Não tem nada selecionado</h2>
      </Container>
    </AsideContainer >
  );
}