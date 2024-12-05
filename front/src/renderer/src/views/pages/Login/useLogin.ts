import { Navigate } from 'react-router-dom';

import toast from '@renderer/utils/toast';

import { authService } from '@renderer/services/authService';

export default function useLogin() {

  async function handleSubmit({ email, password }) {
    try {
      const token = await authService.signIn({ email, password });

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
