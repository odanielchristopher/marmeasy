//@ts-ignore
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import { FormModal } from './styles';
import useClientModal from './useClientModal';

interface ClientModalProps {
  isOpen: boolean
  onClose(): void
}

export default function ClientModal({ isOpen, onClose }: ClientModalProps) {
  const { errors, handleSubmit, isLoading, register } = useClientModal(isOpen);

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

        <Input type="text" placeholder="Telefone do cliente" {...register('phone')} />
        <Input type="text" placeholder="Endereço do cliente" {...register('address')} />
        <Input type="text" placeholder="CPF do cliente" {...register('cpf')} />

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
