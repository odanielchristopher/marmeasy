import { LuPlus } from 'react-icons/lu';
import InputMask from 'react-input-mask';

import { DropdownMenu } from '../DropdownMenu';

import { BusinessIcon } from '@renderer/assets/Icons/Business';
import { ClientIcon } from '@renderer/assets/Icons/ClientIcon';
import { Input } from '@renderer/views/components/Input';

import { Container, StyledButton, StyledItem, FormModal } from './styles';

import Modal from '../Modal';

import { useFabController } from './useFabController';

export default function Fab() {

  const {
    isOpenModalClient,
    isOpenModalCompany,
    handleOpenClientModal,
    handleOpenCompanyModal,
    handleCloseClientModal,
    handleCloseCompanyModal,
    handleClientSubmit,
    handleSubmit,
    register,
    errors,
  }  = useFabController();


  return (
    <Container>
      <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <StyledButton>
          <LuPlus size={24} />
        </StyledButton>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content side='top' sideOffset={4} align='end'>
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

    <Modal
      open={isOpenModalClient}
      onClose={handleCloseClientModal}
      title='Novo cliente'
      action={<button className="saveClient" onClick={() => console.log("salvando cliente")} type='submit' form='client-form'>Adicionar Cliente</button>}
      children={
        <FormModal id='client-form'
          onSubmit={ handleSubmit(handleClientSubmit) }
        >
          <Input
            type="text"
            placeholder="Nome do cliente"
            $error={errors.name?.message}
            {...register('name')}
          />

          <InputMask
            mask='(99) 99999-9999'
            maskChar={null}
            {...register('phone')}>
            {(inputProps: any) => <Input type="text" placeholder='Telefone do cliente' {...inputProps} />}
          </InputMask>
          <Input
            type="text"
            placeholder='Endereço do cliente'
            {...register('address')}
           />
           <InputMask
            mask='999.999.999-99'
            maskChar={null}
            {...register('cpf')}>
            {(inputProps: any) => <Input type="text" placeholder='CPF do cliente' {...inputProps} />}
            </InputMask>

          <div className='dividerInput'>
            <Input
              type="number"
              placeholder='Numero'
              {...register('number')}
            />
            <Input
              type="text"
              placeholder='Bairro'
              {...register('district')}
            />
          </div>
        </FormModal>
      }
      />

<Modal
      open={isOpenModalCompany}
      onClose={handleCloseCompanyModal}
      title='Nova Empresa'
      action={<button className="saveClient" onClick={() => console.log("salvando cliente")} type='submit' form='company-form'>Adicionar Cliente</button>}
      children={
        <FormModal id='company-form' onSubmit={ handleSubmit(handleClientSubmit) }>
          <Input
            type="text"
            placeholder="Nome da empresa"
            $error={errors.name?.message}
            {...register('name')}
          />

          <InputMask
            mask='(99) 99999-9999'
            maskChar={null}
            {...register('phone')}
           >
            {(inputProps: any) => <Input type="text" placeholder='Telefone da empresa' {...inputProps} />}
           </InputMask>
          <Input
            type="text"
            placeholder='Endereço da empresa'
            {...register('address')}
           />

           <InputMask
            mask='99.999.999/9999-99'
            maskChar={null}
            {...register('cnpj')}
           >
            {(inputProps: any) => <Input type="text" placeholder='CNPJ da empresa' {...inputProps} />}
           </InputMask>

          <div className='dividerInput'>
            <Input
              type="number"
              placeholder='Numero'
              {...register('number')}
            />
            <Input
              type="text"
              placeholder='Bairro'
              {...register('district')}
            />
          </div>
        </FormModal>
      }
      />
    </Container>
  );
}
