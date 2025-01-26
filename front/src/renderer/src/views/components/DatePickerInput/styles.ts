import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
  color: #7f1d1d; /* text-red-900 */
`;

export const Button = styled.button<{ error?: boolean }>`
  background-color: white;
  width: 100%;
  border-radius: 0.5rem; /* rounded-lg */
  border: 1px solid ${({ error }) => (error ? '#7f1d1d' : '#6b7280')}; /* border-red-900 or border-gray-500 */
  padding: 0 0.75rem; /* px-3 */
  color: #374151; /* text-gray-700 */
  transition: border-color 0.2s;
  outline: none;
  text-align: left;
  position: relative;
  padding: 0.5rem;

  &:focus {
    border-color: #1f2937; /* focus:border-gray-800 */
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  gap: 0.5rem; /* gap-2 */
  align-items: center;
  margin-top: 0.5rem; /* mt-2 */
  color: #7f1d1d; /* text-red-900 */
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem; /* text-xs */
`;
