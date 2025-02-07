import { Expense } from '@renderer/app/entities/Expense';
import { CurrencyInput } from '@renderer/views/components/CurrencyInput';
import DatePickerInput from '@renderer/views/components/DatePickerInput';
import Select from '@renderer/views/components/Select';
import { Controller } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import { Form, SelectContainer, SubmitButton, ValueContainer } from './styles';
import useExpenseForm, { ExpenseFormSchema } from './useExpenseForm';

interface ExpenseFormProps {
  isLoading?: boolean;
  buttonLabel: string;
  expense?: Expense | null;
  onSubmit(data: ExpenseFormSchema): Promise<void>;
  onSuccess?(): void;
}

export default function ExpenseForm({
  buttonLabel,
  isLoading,
  expense,
  onSubmit,
  onSuccess,
}: ExpenseFormProps) {
  const {
    errors,
    control,
    selectOption,
    selectedType,
    setFocus,
    handleSelectedType,
    handleSubmit,
  } = useExpenseForm({
    expense,
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
        <Select
          placeholder="Tipo*"
          value={selectedType}
          options={selectOption}
          $type='secondary'
          onChange={handleSelectedType}
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
