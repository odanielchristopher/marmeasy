
import toast from '@renderer/app/utils/toast';

import { useAuth } from '@renderer/app/hooks/useAuth';
import { authService } from '@renderer/app/services/authService';

export default function useRegister() {
  const { signin } = useAuth();

  async function handleSubmit({ email, password }) {
    try {
      await authService.singUp({ email, password });

      toast({
        type: 'sucess',
        text: 'Usuário registrado com sucesso',
      });
      signin('hash');
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar usuário',
      });
    }
  }

  return {
    handleSubmit,
  };
}
