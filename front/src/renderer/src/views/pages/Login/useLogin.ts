
import { useAuth } from '@renderer/app/hooks/useAuth';
import toast from '@renderer/app/utils/toast';

import { authService } from '@renderer/app/services/authService';

export default function useLogin() {
  const { signin } = useAuth();


  async function handleSubmit({ email, password }) {
    try {
      const token = await authService.signIn({ email, password });


      console.log(token);
      // Se tudo estiver certo, redireciona para a página home
      toast({
        type: 'sucess',
        text: 'Usuário autenticado.',
      });
      signin('hash');
    } catch {
      toast({
        type: 'danger',
        text: 'Email e senha inválidos!',
      });
    }
  }

  return {
    handleSubmit,
  };
}
