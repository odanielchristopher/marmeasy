import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  width: 40rem;
  gap: 2.4rem;

  button {
    margin-top: 2rem;
    width: 100%;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.2rem;
`;

export const TextContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const Description = styled.span`
  font-size: 1.6rem;
  line-height: 2rem;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.orange.main} !important;
  text-decoration: none;

  font-size: 1.6rem;
  font-weight: 500;
  line-height: 140%;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;
