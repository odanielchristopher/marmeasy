import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';

import {
  IUseProductCategoryFormController,
  useProductCategoryFormController,
} from './useProductCategoryFormController';

interface IProductCategoryFormProps extends IUseProductCategoryFormController {
  buttonLabel: string;
  isLoading?: boolean;
}

export function ProductCategoryForm({
  buttonLabel,
  isLoading,
  defaultValues,
  onSubmit,
}: IProductCategoryFormProps) {
  const { form, formState, handleSubmit } = useProductCategoryFormController({
    defaultValues,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Emoji*"
          {...form.register('icon')}
          error={formState.errors.icon?.message}
        />

        <Input
          placeholder="Nome*"
          {...form.register('name')}
          error={formState.errors.name?.message}
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-6"
        isLoading={isLoading}
        disabled={isLoading || (defaultValues && !formState.isDirty)}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
