import { zodResolver } from '@hookform/resolvers/zod';
import { isEmoji } from '@renderer/app/utils/isEmoji';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Container, Form } from './styles';

interface EditProductModalProps {
  open: boolean
  onClose?(): void
}

const categoryFormSchema = z.object({
  icon: z
    .string({ required_error: 'O emoji é obrigatório.' })
    .refine((value) => isEmoji(value), {
      message: 'Precisa ser somente um emoji.',
    }),
  name: z
    .string({ required_error: 'O nome é obrigatório.' })
    .min(2, 'O nome deve ter pelo menos 2 carateres.'),
});

export type FormData = z.infer<typeof categoryFormSchema>

export default function NewCategoryModal({ open, onClose }: EditProductModalProps) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(categoryFormSchema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Modal title="Nova categoria" open={open} onClose={onClose}>
      <Container>
        <Form noValidate onSubmit={handleSubmit}>
          <p>Escreva os dados da categoria</p>

          <Input
            type="text"
            placeholder="Emoji"
            $error={errors.icon?.message}
            {...register('icon')}
          />

          <Input
            type="text"
            placeholder="Nome"
            $error={errors.name?.message}
            {...register('name')}
          />

          <Button type="submit">Adicionar nova categoria</Button>
        </Form>
      </Container>
    </Modal>
  );
}
