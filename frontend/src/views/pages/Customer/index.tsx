import { useParams } from 'react-router';

type Params = {
  id: string;
};

export function Customer() {
  const { id } = useParams<Params>();

  return <div>Página do cliente com o id: #{id}</div>;
}
