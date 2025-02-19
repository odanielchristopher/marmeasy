import styled from 'styled-components';

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 0.2rem solid rgba(204, 204, 204, 0.4);
  border-radius: 1rem;
  overflow: hidden;

  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.06);
`;

export const Row = styled.tr``;

export const HeaderTable = styled.thead`
  background: rgba(204, 204, 204, 0.2);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 150%;
`;

export const BodyTable = styled.tbody`
  background-color: #fff;
`;

export const HeaderColumn = styled.th`
  padding: 1.6rem;
  text-align: left;
`;

export interface TableCellProps {
  align?: 'left' | 'center' | 'right';
}

export const TableCell = styled.td<TableCellProps>`
  padding: 1.6rem;
  font-size: 1.4rem;
  text-align: ${({ align }) => align || 'left'};
  vertical-align: middle;

  border-bottom: 0.2rem solid rgba(204, 204, 204, 0.4);
`;
