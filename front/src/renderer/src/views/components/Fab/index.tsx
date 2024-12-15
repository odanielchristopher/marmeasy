import { LuPlus } from 'react-icons/lu';

import { DropdownMenu } from '../DropdownMenu';

import { BusinessIcon } from '@renderer/assets/Icons/Business';
import { ClientIcon } from '@renderer/assets/Icons/ClientIcon';

import { Container, StyledButton, StyledItem } from './styles';

import ClientModal from '@renderer/views/modals/ClientModal';
import CompanyModal from '@renderer/views/modals/CompanyModal';
import { useFabController } from './useFabController';

export default function Fab() {
  const {
    isOpenModalClient,
    isOpenModalCompany,
    handleOpenClientModal,
    handleOpenCompanyModal,
    handleCloseClientModal,
    handleCloseCompanyModal,
  } = useFabController();

  return (
    <Container>
      <ClientModal isOpen={isOpenModalClient} onClose={handleCloseClientModal} />
      <CompanyModal isOpen={isOpenModalCompany} onClose={handleCloseCompanyModal} />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <StyledButton>
            <LuPlus size={24} />
          </StyledButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content side="top" sideOffset={4} align="end">
          <DropdownMenu.Item onSelected={() => handleOpenClientModal()} asChild>
            <StyledItem>
              <ClientIcon />
              Novo cliente
            </StyledItem>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelected={() => handleOpenCompanyModal()} asChild>
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
