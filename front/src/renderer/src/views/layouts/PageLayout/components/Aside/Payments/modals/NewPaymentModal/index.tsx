import { CurrencyInput } from '@renderer/views/components/CurrencyInput';
import DatePickerInput from '@renderer/views/components/DatePickerInput';
import Modal from '@renderer/views/components/Modal';
import { Controller } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import PaymentTypeDropdown from '../../PaymentTypeDropdown';
import {
  Container,
  Form,
  SelectContainer,
  SubmitButton,
  ValueContainer,
} from './styles';
import useNewPaymentModal from './useNewPaymentModal';

export default function NewPaymentModal() {
  const {
    errors,
    control,
    setFocus,
    selectedType,
    handleSelectedType,
    handleSubmit,
  } = useNewPaymentModal();

  return (
    <Modal open={true} title="Novo pagamento">
      <Container>
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
                placeholder='Data*'
                $error={errors.date?.message}
              />
            )}
          />

          <SubmitButton type="submit">
            Criar pagamento
          </SubmitButton>
        </Form>
      </Container>
    </Modal>
  );
}
