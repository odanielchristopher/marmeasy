import { LuPlus } from 'react-icons/lu';

import { DropdownMenu } from '../DropdownMenu';

import { BusinessIcon } from '@renderer/assets/Icons/Business';
import { ClientIcon } from '@renderer/assets/Icons/ClientIcon';

import { Container, StyledButton, StyledItem } from './styles';

export default function Fab() {
  return (
    <Container>
      <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <StyledButton>
          <LuPlus size={24} />
        </StyledButton>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content side='top' sideOffset={4} align='end'>
          <DropdownMenu.Item onSelected={() => console.log('funcoinou')} asChild>
            <StyledItem>
              <ClientIcon />
              Novo cliente
            </StyledItem>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelected={() => console.log('funcoinou')} asChild>
            <StyledItem>
              <BusinessIcon />
              Nova empresa
            </StyledItem>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
    </Container>
  );
}
