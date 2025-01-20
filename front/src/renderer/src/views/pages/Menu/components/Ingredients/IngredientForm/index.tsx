import { Ingredient } from '@renderer/app/entities/Ingredient';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import { CancelButton, Footer, Form } from './styles';
import useIngredientForm, { IngredientFormData } from './useIngredientForm';

interface IngredientFormProps {
  onCancel?(): void
  ingredient?: Ingredient | null
  onSubmit(data: IngredientFormData): Promise<void>
  isLoading?: boolean
}

export default function IngredientForm({ onCancel, ingredient, onSubmit, isLoading }: IngredientFormProps) {
  const { errors, register, handleSubmit } = useIngredientForm({
    ingredientBeingEdited: ingredient,
    onConfirm: onCancel,
    onSubmit,
  });

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <p>Aqui estão os dados do ingrediente</p>

      <Input type="text" placeholder="Emoji*" $error={errors.icon?.message} {...register('icon')} />

      <Input type="text" placeholder="Nome*" $error={errors.name?.message} {...register('name')} />

      <Footer>
        <CancelButton onClick={onCancel}>Cancelar</CancelButton>
        <Button type="submit" isLoading={isLoading}>
          Salvar alterações
        </Button>
      </Footer>
    </Form>
  );
}
