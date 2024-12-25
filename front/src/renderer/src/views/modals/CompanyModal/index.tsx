//@ts-ignore
import Button from '@renderer/views/components/Button';
import CurrencyInput from '@renderer/views/components/CurrencyInput';
import { Input } from '@renderer/views/components/Input';
import InputMask from '@renderer/views/components/InputMask';
import Modal from '@renderer/views/components/Modal';
import { Controller } from 'react-hook-form';
import { BalanceContainer, FormModal } from './styles';
import useCompanyModal from './useCompanyModal';

interface ClientModalProps {
  isOpen: boolean
  onClose(): void
}

export default function ClientModal({ isOpen, onClose }: ClientModalProps) {
  const { errors, handleSubmit, isLoading, register, control } = useCompanyModal(isOpen, onClose);

  return (
    <Modal open={isOpen} title="Nova empresa" onClose={onClose}>
      <FormModal id="client-form" onSubmit={handleSubmit}>
        <p>Digite as informações do seu cliente.</p>

        <BalanceContainer>
          <span className='label'>Saldo inicial</span>
          <div className='input'>
            <span>R$</span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <CurrencyInput
                  value={value}
                  onChange={onChange}
                  $error={errors.initialBalance?.message}
                />
              )}
            />
          </div>
        </BalanceContainer>

        <Input
          type="text"
          placeholder="Nome da empresa"
          $error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value, name } }) => (
            <InputMask
              name={name}
              type="text"
              placeholder="Telefone da empresa"
              format="(##) ##### ####"
              mask='_'
              $error={errors.phone?.message}
              onChangeValue={onChange}
              value={value}
            />
          )}
        />

        <Input type="text" placeholder="Endereço da empresa" {...register('address')} />

        <Controller
          control={control}
          name="cnpj"
          render={({ field: { onChange, value, name } }) => (
            <InputMask
              name={name}
              type="text"
              placeholder="CNPJ da empresa"
              format="##.###.###/####-##"
              mask='_'
              $error={errors.cnpj?.message}
              onChangeValue={onChange}
              value={value}
            />
          )}
        />

        <Button type="submit" isLoading={isLoading} onClick={handleSubmit}>
          Adicionar empresa
        </Button>
      </FormModal>
    </Modal>
  );
}
