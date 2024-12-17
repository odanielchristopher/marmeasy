import { ComponentProps } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Container, Input } from './styles';

interface SearchInputProps extends ComponentProps<'input'> {
  value: string;
  onValueChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SearchInput({ value, onValueChange }: SearchInputProps) {
  return (
    <Container>
      <IoIosSearch size={28} />
      <Input
        placeholder="Pesquisar por nome..."
        value={value}
        onChange={onValueChange}
      />
    </Container>
  );
}
