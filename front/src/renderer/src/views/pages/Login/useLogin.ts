import UserService from '@renderer/services/UserService';
import toast from '@renderer/utils/toast';
import { Navigate } from 'react-router-dom';

export default function useLogin() {

  async function handleSubmit({ email, password }) {
    try {
      const token = await UserService.getAuthorization({ email, password });

      console.log(token);

      // Se tudo estiver certo, redireciona para a página home
      toast({
        type: 'sucess',
        text: 'Usuário autenticado.',
        duration: 1500
      });
      Navigate({ to: '/orders' });
    } catch {
      toast({
        type: 'danger',
        text: 'Email e senha inválidos!'
      });
    }
  }

  return {
    handleSubmit
  };
}
