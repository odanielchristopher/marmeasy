import { HiOutlinePencilAlt } from 'react-icons/hi';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1.6rem;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 140%;
  }
`;

export const EditIcon = styled(HiOutlinePencilAlt)`
  color: ${({ theme }) => theme.colors.orange.light};
`;

export const PaymentList = styled.ul``;

export const PaymentContainer = styled.div``;


