import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const clientFormSchema = z.object({
  name: z.string().min(1, "O nome do cliente é um campo obrigatório"),
  phone: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  district: z.string().optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
});

type ClientForm = {
  name: string;
  phone?: string;
  address?: string;
  number?: string;
  district?: string;
  cpf?: string;
  cnpj?: string;
};

export const useFabController = () => {
  const [isOpenModalClient, setOpenModalClient] = useState(false);
  const [isOpenModalCompany, setOpenModalCompany] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientForm>({
    resolver: zodResolver(clientFormSchema),
  });

  const handleOpenClientModal = () => {
    reset();
    setOpenModalClient(true);
  };

  const handleOpenCompanyModal = () => {
    reset();
    setOpenModalCompany(true);
  };

  const handleCloseClientModal = () => {
    setOpenModalClient(false);
  };

  const handleCloseCompanyModal = () => {
    setOpenModalCompany(false);
  };

  const handleClientSubmit = (data: ClientForm) => {
    console.log(data);
    reset();
    setOpenModalClient(false);
  };

  return {
    isOpenModalClient,
    isOpenModalCompany,
    handleOpenClientModal,
    handleOpenCompanyModal,
    handleCloseClientModal,
    handleCloseCompanyModal,
    handleClientSubmit,
    handleSubmit,
    register,
    errors,
  };
};
