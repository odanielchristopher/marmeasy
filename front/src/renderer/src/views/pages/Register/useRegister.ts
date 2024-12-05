import { Navigate } from 'react-router-dom';

import toast from '@renderer/utils/toast';

import { authService } from '@renderer/services/authService';

export default function useRegister() {
  async function handleSubmit({ email, password }) {
    try {
      await authService.singUp({ email, password });

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
