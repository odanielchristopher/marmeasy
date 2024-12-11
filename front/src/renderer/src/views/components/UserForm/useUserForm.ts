import { useForm } from 'react-hook-form';

type FormData = { email: string; password: string; };

export default function useUserFormController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
   } = useForm<FormData>();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data);
  });

  return {
    handleSubmit,
    register,
  };
}
