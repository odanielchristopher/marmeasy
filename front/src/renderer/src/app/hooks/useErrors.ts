import { useCallback, useState } from 'react';

interface ErrorProps {
  field: string;
  message: string;
}

export default function useErrors() {
  const [errors, setErrors] = useState<ErrorProps[]>([]);

  const setError = useCallback(({ field, message }: ErrorProps) => {
    // Verifica se o erro já existe
    setErrors((prevState) => {
      const errorAlreadyExists = prevState.find(
        (error) => error.field === field,
      );
      if (errorAlreadyExists) {
        return prevState; // Retorna o estado anterior se o erro já existir
      }
      return [...prevState, { field, message }]; // Adiciona o novo erro se não existir
    });
  }, []);

  const removeError = useCallback((fieldName: string) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== fieldName),
    );
  }, []);

  const getErrorMessageByFieldName = useCallback(
    (fieldName: string) => {
      return errors.find((error) => error.field === fieldName)?.message;
    },
    [errors],
  );

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
