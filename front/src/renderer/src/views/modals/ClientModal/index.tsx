//@ts-ignore
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import InputMask from '@renderer/views/components/InputMask';
import Modal from '@renderer/views/components/Modal';
import { Controller } from 'react-hook-form';
import { FormModal } from './styles';
import useClientModal from './useClientModal';

interface ClientModalProps {
  isOpen: boolean
  onClose(): void
}

export default function ClientModal({ isOpen, onClose }: ClientModalProps) {
  const { errors, handleSubmit, isLoading, register, control } = useClientModal(isOpen);

  return (
    <Modal open={isOpen} title="Novo cliente" onClose={onClose}>
      <FormModal onSubmit={handleSubmit}>
        <p>Digite as informações do seu cliente.</p>

        <Input
          type="text"
          placeholder="Nome do cliente"
          $error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          control={control}
          name='phone'
          render={({ field: { onChange, value, name } }) => (
            <InputMask
              name={name}
              type="text"
              placeholder="Telefone do cliente"
              format="(##) ##### ####"
              $error={errors.phone?.message}
              onChangeValue={onChange}
              value={value}
            />
          )}
        />

        <Input type="text" placeholder="Endereço do cliente" {...register('address')} />
        <Controller
          control={control}
          name='cpf'
          render={({ field: { onChange, value, name } }) => (
            <InputMask
              name={name}
              type="text"
              placeholder="CPF do cliente"
              format="###.###.###-##"
              $error={errors.cpf?.message}
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
          Adicionar cliente
        </Button>
      </FormModal>
    </Modal>
  );
}