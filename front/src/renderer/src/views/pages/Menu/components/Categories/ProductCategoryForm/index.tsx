import { ProductCategory } from '@renderer/app/entities/ProductCategory';
import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import { CancelButton, Footer, Form } from './styles';
import useProductCategoryForm, {
  ProductCategoryFormData,
} from './useProductCategoryForm';

interface ProductCategoryFormProps {
  category?: ProductCategory | null;
  isLoading?: boolean;
  buttonLabel: string;
  onCancel?(): void;
  onSubmit(data: ProductCategoryFormData): Promise<void>;
}

export default function ProductCategoryForm({
  isLoading,
  category,
  onCancel,
  onSubmit,
  buttonLabel,
}: ProductCategoryFormProps) {
  const { errors, register, handleSubmit } = useProductCategoryForm({
    onSubmit,
    category,
  });

  const hasCancelButton = onCancel ? true : false;

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <p>Aqui estão os dados da categoria</p>

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
