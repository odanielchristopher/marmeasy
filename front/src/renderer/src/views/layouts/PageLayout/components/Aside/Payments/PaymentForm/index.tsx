import { Payment } from '@renderer/app/entities/Payment';
import { CurrencyInput } from '@renderer/views/components/CurrencyInput';
import DatePickerInput from '@renderer/views/components/DatePickerInput';
import { Controller } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import PaymentTypeDropdown from '../PaymentTypeDropdown';
import { Form, SelectContainer, SubmitButton, ValueContainer } from './styles';
import usePaymentFormModal, { PaymentFormSchema } from './usePaymentFormModal';

interface PaymentFormProps {
  isLoading?: boolean;
  buttonLabel: string;
  payment?: Payment | null;
  onSubmit(data: PaymentFormSchema): Promise<void>;
  onSuccess?(): void;
}

export default function PaymentForm({
  buttonLabel,
  isLoading,
  payment,
  onSubmit,
  onSuccess,
}: PaymentFormProps) {
  const {
    errors,
    control,
    setFocus,
    selectedType,
    handleSelectedType,
    handleSubmit,
  } = usePaymentFormModal({
    payment,
    onSubmit,
    onSuccess,
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <ValueContainer>
        <span className="label">Valor*</span>

        <div className="input-container">
          <div className="input">
            <span>R$</span>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value, ref } }) => (
                <CurrencyInput
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  $error={errors.value?.message}
                  allowNegative={false}
                  maxLength={14}
                />
              )}
            />
          </div>

          <button
            type="button"
            className="label-btn"
            onClick={() => setFocus('value')}
          >
            <LuPencil size={18} />
            Editar saldo
          </button>
        </div>
      </ValueContainer>

      <SelectContainer>
        <span className="label">Tipo*</span>
        <PaymentTypeDropdown
          selectedPayment={selectedType}
          onSelect={handleSelectedType}
        />
      </SelectContainer>

      <Controller
        control={control}
        name="date"
        defaultValue={new Date()}
        render={({ field: { onChange, value } }) => (
          <DatePickerInput
            onChange={onChange}
            value={value}
            placeholder="Data*"
            $error={errors.date?.message}
          />
        )}
      />

      <SubmitButton type="submit" isLoading={isLoading}>
        {buttonLabel}
      </SubmitButton>
    </Form>
  );
}
