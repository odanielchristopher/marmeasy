import styled, { css } from 'styled-components';

export const Description = styled.p`
  display: block;
  color: rgb(34, 34, 34, 0.8);
  font-size: 1.6rem;
  line-height: 130%;
  letter-spacing: -0.1rem;

  margin-top: 1.2rem;
  margin-bottom: 0.2rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #ccc;
`;

export interface LabelProps {
  type?: 'primary' | 'secondary' | 'terciary';
}

const labelVariants = {
  primary: css`
    color: ${({ theme }) => theme.colors.black.main};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.gray.light};
    font-weight: 600;
  `,
  terciary: css`
    color: ${({ theme }) => theme.colors.gray.light};
    font-size: 1.6rem;
    font-weight: 600;
  `,
};

export const Label = styled.strong<LabelProps>`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.1rem;

  ${({ type }) => labelVariants[type || 'primary']}
`;
