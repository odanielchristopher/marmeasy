import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import { Controller } from 'react-hook-form';
import InputMask from '../InputMask';
import { Form } from './styles';
import useClientForm from './useClientForm';

interface ClientFormProps {
  $isShow: boolean
  clientId: string;
}

export default function ClientForm({ $isShow, clientId }: ClientFormProps) {
  const { errors, handleSubmit, isLoading, register, control } = useClientForm($isShow, clientId);

  return (
    <Form onSubmit={handleSubmit}>
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
          Salvar alterações
        </Button>
    </Form>
  );
}
