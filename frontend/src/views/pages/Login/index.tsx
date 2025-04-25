import { Link } from 'react-router';

import { authService } from '@app/services/authService';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';

import { useLoginController } from './useLoginController';

export function Login() {
  const { errors, isLoading, register, handleSubmit } = useLoginController({
    authService,
  });

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-[-1px] dark:text-foreground">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px] dark:text-muted-foreground">
            Novo por aqui?
          </span>
          <Link
            to="/register"
            className="text-primary font-medium tracking-[-0.5px]"
          >
            Crie uma conta.
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </>
  );
}
