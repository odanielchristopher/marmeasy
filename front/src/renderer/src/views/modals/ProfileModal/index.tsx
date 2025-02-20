import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';

import useProfileModal from './useProfileModal';

import { Transition } from '@headlessui/react';
import {
  Container,
  Form,
  InfoContainer,
  NewPasswordButton,
  NewPasswordContainer,
} from './styles';

export default function ProfileModal() {
  const {
    errors,
    isLoading,
    isOpen,
    wantChangePassword,
    handleSubmit,
    register,
    handleWannaChangePassword,
    handleCloseProfileModal,
  } = useProfileModal();

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseProfileModal}
      title="Dados do usuário"
    >
      <Container>
        <p>Edite aqui as suas informações.</p>

        <Form onSubmit={handleSubmit}>
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

          <Transition show={wantChangePassword} unmount={wantChangePassword}>
            <NewPasswordContainer>
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
            </NewPasswordContainer>
          </Transition>

          <InfoContainer>
            <span>Digite sua senha.</span>
            <NewPasswordButton
              type="button"
              onClick={handleWannaChangePassword}
            >
              Alterar senha? <b>Aqui.</b>
            </NewPasswordButton>
          </InfoContainer>
          <Input
            type="password"
            placeholder="Senha"
            isLoading={isLoading}
            $error={errors.currentPassword?.message}
            {...register('currentPassword')}
          />

          <Button type="submit" isLoading={isLoading}>
            Salvar alterações
          </Button>
        </Form>
      </Container>
    </Modal>
  );
}
