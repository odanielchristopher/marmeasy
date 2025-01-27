import Modal from '@renderer/views/components/Modal';
import { NumericInput } from '@renderer/views/components/NumericInput';
import { Controller } from 'react-hook-form';
import { Container, Form } from './styles';
import useNewPaymentModal from './useNewPaymentModal';

export default function NewPaymentModal() {
  const { errors, control } = useNewPaymentModal();

  return (
    <Modal open title="Novo pagamento">
      <Container>
        <Form>
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value, name } }) => (
              <NumericInput
                name={name}
                placeholder="Valor do pagamento*"
                $error={errors.value?.message}
                maxLength={16}
                onInputChange={onChange}
                value={value}
              />
            )}
          />
        </Form>
      </Container>
    </Modal>
  );
}
