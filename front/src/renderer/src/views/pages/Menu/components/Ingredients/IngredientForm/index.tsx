import { Ingredient } from '@renderer/app/entities/Ingredient';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import { CancelButton, Footer, Form } from './styles';
import useIngredientForm, { IngredientFormData } from './useIngredientForm';

interface IngredientFormProps {
  ingredient?: Ingredient | null;
  buttonLabel: string;
  isLoading?: boolean;
  onCancel?(): void;
  onSubmit(data: IngredientFormData): Promise<void>;
}

export default function IngredientForm({
  buttonLabel,
  ingredient,
  isLoading,
  onCancel,
  onSubmit,
}: IngredientFormProps) {
  const { errors, register, handleSubmit } = useIngredientForm({
    ingredientBeingEdited: ingredient,
    onSubmit,
  });

  const hasCancelButton = onCancel ? true : false;

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <p>Aqui estão os dados do ingrediente</p>

      <Input
        type="text"
        placeholder="Emoji*"
        $error={errors.icon?.message}
        {...register('icon')}
      />

      <Input
        type="text"
        placeholder="Nome*"
        $error={errors.name?.message}
        {...register('name')}
      />

      <Footer justify={hasCancelButton ? 'center' : 'end'}>
        {hasCancelButton && (
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
        )}

        <Button type="submit" isLoading={isLoading}>
          {buttonLabel}
        </Button>
      </Footer>
    </Form>
  );
}
