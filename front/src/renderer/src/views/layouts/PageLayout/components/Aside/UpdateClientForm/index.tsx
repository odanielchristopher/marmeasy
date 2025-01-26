import { Client } from '@renderer/app/entities/Client';
import Button from '@renderer/views/components/Button';
import { CurrencyInput } from '@renderer/views/components/CurrencyInput';
import { Input } from '@renderer/views/components/Input';
import InputMask from '@renderer/views/components/InputMask';
import { Controller } from 'react-hook-form';
import { BalanceContainer, Form } from './styles';
import useUpdateClientForm from './useUpdateClientForm';

interface ClientFormProps {
  $isShow: boolean;
  client: Client | null;
}

export default function UpdateClientForm({ $isShow, client }: ClientFormProps) {
  const { errors, handleSubmit, isLoading, register, control } =
    useUpdateClientForm($isShow, client);

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        Abaixo estão os dados{' '}
        {client?.type === 'FISICO' ? 'do seu cliente' : 'da sua empresa'}.
      </p>

      <BalanceContainer>
        <span className="label">Saldo</span>
        <div className="input">
          <span>R$</span>
          <Controller
            control={control}
            name="balance"
            render={({ field: { onChange, value } }) => (
              <CurrencyInput
                value={value}
                onChange={onChange}
                $error={errors.balance?.message}
              />
            )}
          />
        </div>
      </BalanceContainer>

      <Input
        type="text"
        placeholder={`Nome ${client?.type === 'FISICO' ? 'do cliente' : 'da empresa'}`}
        $error={errors.name?.message}
        maxLength={15}
        {...register('name')}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value, name } }) => (
          <InputMask
            name={name}
            type="text"
            placeholder={`Telefone ${client?.type === 'FISICO' ? 'do cliente' : 'da empresa'}`}
            format="(##) #####-####"
            $error={errors.phone?.message}
            onChangeValue={onChange}
            value={value}
          />
        )}
      />

      <Input
        type="text"
        placeholder={`Endereço ${client?.type === 'FISICO' ? 'do cliente' : 'da empresa'}`}
        {...register('address')}
      />

      {client?.type === 'FISICO' && (
        <Controller
          control={control}
          name="cpf"
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
      )}

      {client?.type === 'JURIDICO' && (
        <Controller
          control={control}
          name="cnpj"
          render={({ field: { onChange, value, name } }) => (
            <InputMask
              name={name}
              type="text"
              placeholder="CNPJ da empresa"
              format="##.###.###/####-##"
              mask="_"
              $error={errors.cnpj?.message}
              onChangeValue={onChange}
              value={value}
            />
          )}
        />
      )}

      <Button type="submit" isLoading={isLoading} onClick={handleSubmit}>
        Salvar alterações
      </Button>
    </Form>
  );
}
