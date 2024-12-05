import UserService from '@renderer/services/UserService';
import toast from '@renderer/utils/toast';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export default function useRegister() {
  async function handleSubmit({ email, password }) {
    try {
      await UserService.registerNewUser({ email, password });

      toast({
        type: 'sucess',
        text: 'Usuário registrado com sucesso'
      });
      Navigate({ to: '/login', replace: true });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar usuário'
      });
    }
  }

  return {
    handleSubmit
  };
}
