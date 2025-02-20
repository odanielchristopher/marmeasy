import styled, { keyframes } from 'styled-components';

const scoleIn = keyframes`
  from {
    opacity: 0;
    scale: 0.2;
    width: 100%;
  }
  to {
    opacity: 1;
    scale: 1;
    width: 100%;
  }
`;

export const Container = styled.div`
  position: relative;

  p {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
    margin-bottom: 1.6rem;
  }
`;

export const Form = styled.form`
  button {
    margin-top: 2rem;
    width: 100%;
    height: 4.8rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 1.2rem 0.6rem;

  span {
    color: ${({ theme }) => theme.colors.gray.main};
    font-size: 1.4rem;
  }
`;

export const NewPasswordButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.gray.main};
  font-size: 1.4rem;
  margin: 0 !important;
  height: auto !important;
  width: auto !important;
  display: inline;

  b {
    color: #528ab2;
    font-weight: 500;
  }
`;

export const NewPasswordContainer = styled.div`
  margin-top: 1.2rem;
  animation: ${scoleIn} ease-in 0.15s forwards;
`;

export const DeleteButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
