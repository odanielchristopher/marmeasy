//@ts-ignore
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import InputMask from '@renderer/views/components/InputMask';
import Modal from '@renderer/views/components/Modal';
import { Controller } from 'react-hook-form';
import { FormModal } from './styles';
import useCompanyModal from './useCompanyModal';

interface ClientModalProps {
  isOpen: boolean
  onClose(): void
}

export default function ClientModal({ isOpen, onClose }: ClientModalProps) {
  const { errors, handleSubmit, isLoading, register, control } = useCompanyModal(isOpen);

  return (
    <Modal open={isOpen} title="Nova empresa" onClose={onClose}>
      <FormModal id="client-form" onSubmit={handleSubmit}>
        <p>Digite as informações do seu cliente.</p>
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
              $error={errors.cnpj?.message}
              onChangeValue={onChange}
              value={value}
            />
          )}
        />

        <div className="dividerInput">
          <Input type="number" placeholder="Numero" {...register('number')} />
          <Input type="text" placeholder="Bairro" {...register('district')} />
        </div>

        <Button type="submit" isLoading={isLoading} onClick={handleSubmit}>
          Adicionar empresa
        </Button>
      </FormModal>
    </Modal>
  );
}
