import { ComponentProps } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Container, Input } from './styles';

interface SearchInputProps extends ComponentProps<'input'> {
  value: string;
  onValueChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

export default function SearchInput({
  value,
  onValueChange,
  placeholder,
}: SearchInputProps) {
  return (
    <Container>
      <IoIosSearch size={28} />
      <Input placeholder={placeholder} value={value} onChange={onValueChange} />
    </Container>
  );
}
