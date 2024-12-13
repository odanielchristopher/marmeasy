import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';

import useProfileController from './useProfileController';

import { Container } from './styles';

export default function Profile() {
  const {
    errors,
    isLoading,
    isProfileModalOpen,
    handleIsProfileModalOpen,
    handleSubmit,
    register,
  } = useProfileController();

  return (
    <Modal open={isProfileModalOpen} onClose={handleIsProfileModalOpen} title="Dados do usuário">
      <Container >

        <p>
          Edite aqui as suas informações.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome"
            isLoading={isLoading}
            $error={errors.name?.message}
            {...register('name')}
          />

          <Input
            type="email"
            placeholder="E-mail"
            isLoading={isLoading}
            $error={errors.email?.message}
            {...register('email')}
          />

          <Input
            type="password"
            placeholder="Senha atual"
            isLoading={isLoading}
            $error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />

          <Input
            type="password"
            placeholder="Nova senha"
            isLoading={isLoading}
            $error={errors.newPassword?.message}
            {...register('newPassword')}
          />

          <Input
            type="password"
            placeholder="Confirmar nova senha"
            isLoading={isLoading}
            $error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" isLoading={isLoading}>
            Salvar alterações
          </Button>
        </form>
      </Container>
    </Modal>
  );
}
