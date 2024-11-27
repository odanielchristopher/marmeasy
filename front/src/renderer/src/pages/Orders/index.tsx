import { Link } from 'react-router-dom';

export default function Orders(): JSX.Element {
  return (
    <>
      <p>hello from orders page</p>

      <Link to="/clients">other</Link>
    </>
  );
}
