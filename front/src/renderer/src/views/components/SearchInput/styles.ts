import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  svg {
    color: ${({ theme }) => theme.colors.gray.light};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: 30rem;
  padding: 0.8rem 1rem;
  padding-left: 4.2rem;
  border-radius: 1rem;
  height: 4.8rem;
  border: 0.08rem solid transparent;
  font-size: 1.6rem;
  line-height: 1.8rem;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.08);
`;
