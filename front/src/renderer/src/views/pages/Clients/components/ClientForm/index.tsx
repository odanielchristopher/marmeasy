import { Client } from '@renderer/app/entities/Client';
import Button from '@renderer/views/components/Button';
import { CurrencyInput } from '@renderer/views/components/CurrencyInput';
import { Input } from '@renderer/views/components/Input';
import InputMask from '@renderer/views/components/InputMask';
import { Controller } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import { BalanceContainer, Form } from './styles';
import useClientForm, { ClientFormData } from './useClientForm';

interface ClientFormProps {
  isLoading: boolean;
  buttonLabel: string;
  client?: Client | null;
  clientType: 'FISICO' | 'JURIDICO';
  onSubmit(data: ClientFormData): Promise<void>;
}

export default function ClientForm({
  client,
  clientType,
  buttonLabel,
  isLoading,
  onSubmit,
}: ClientFormProps) {
  const { errors, control, handleSubmit, register, setFocus } = useClientForm({
    client,
    clientType,
    onSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <p>
        Abaixo estão os dados{' '}
        {clientType === 'FISICO' ? 'do seu cliente' : 'da sua empresa'}.
      </p>

      <BalanceContainer>
        <span className="label">Saldo*</span>

        <div className="input-container">
          <div className="input">
            <span>R$</span>
            <Controller
              control={control}
              name="balance"
              render={({ field: { onChange, value, ref } }) => (
                <CurrencyInput
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  $error={errors.balance?.message}
                />
              )}
            />
          </div>

          <button
            type="button"
            className="label-btn"
            onClick={() => setFocus('balance')}
          >
            <LuPencil size={18} />
            Editar saldo
          </button>
        </div>
      </BalanceContainer>

      <Input
        type="text"
        placeholder={`Nome ${clientType === 'FISICO' ? 'do cliente' : 'da empresa'}*`}
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
            placeholder={`Telefone ${clientType === 'FISICO' ? 'do cliente' : 'da empresa'}`}
            format="(##) #####-####"
            $error={errors.phone?.message}
            onChangeValue={onChange}
            value={value}
          />
        )}
      />

      <Input
        type="text"
        placeholder={`Endereço ${clientType === 'FISICO' ? 'do cliente' : 'da empresa'}`}
        {...register('address')}
      />

      {clientType === 'FISICO' && (
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

      {clientType === 'JURIDICO' && (
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
        {buttonLabel}
      </Button>
    </Form>
  );
}
