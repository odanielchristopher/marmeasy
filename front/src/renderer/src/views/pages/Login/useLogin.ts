
import toast from '@renderer/utils/toast';

import { useAuth } from '@renderer/hooks/useAuth';
import { authService } from '@renderer/services/authService';

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
        duration: 1500
      });
      signin('hash');
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
