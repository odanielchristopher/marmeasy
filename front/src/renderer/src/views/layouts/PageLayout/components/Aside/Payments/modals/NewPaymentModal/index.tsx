import { CurrencyInput } from '@renderer/views/components/CurrencyInput';
import Modal from '@renderer/views/components/Modal';
import { Controller } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import PaymentTypeDropdown from '../../PaymentTypeDropdown';
import { Container, Form, SelectContainer, ValueContainer } from './styles';
import useNewPaymentModal from './useNewPaymentModal';

export default function NewPaymentModal() {
  const { errors, control, setFocus, selectedType, handleSelectedType } = useNewPaymentModal();

  return (
    <Modal open={true} title="Novo pagamento">
      <Container>
        <Form>
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

          <SelectContainer>

          </SelectContainer>

        </Form>
      </Container>
    </Modal>
  );
}
