import Button from '@renderer/views/components/Button';
import { Input } from '@renderer/views/components/Input';
import Modal from '@renderer/views/components/Modal';

import useProfileModal from './useProfileModal';

import { Transition } from '@headlessui/react';
import { DeleteIcon } from '@renderer/assets/Icons/DeleteIcon';
import DeleteModal from '../DeleteModal';
import {
  Container,
  DeleteButton,
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
    isDeleteModalOpen,
    handleSubmit,
    register,
    handleWannaChangePassword,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleCloseProfileModal,
  } = useProfileModal();

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        open
        onClose={handleCloseDeleteModal}
        onConfirm={() => console.log('excluiu')}
        answer={`
          Tem ceteza que deseja excluir sua conta?
        `}
        description={`
          Todos os dados relacionados a sua conta
          serão apagados e não poderão ser recurados.
        `}
      />
    );
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseProfileModal}
      title="Dados do usuário"
      action={
        <DeleteButton onClick={handleOpenDeleteModal}>
          <DeleteIcon />
        </DeleteButton>
      }
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
            <NewPasswordButton type="button" onClick={handleWannaChangePassword}>
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
