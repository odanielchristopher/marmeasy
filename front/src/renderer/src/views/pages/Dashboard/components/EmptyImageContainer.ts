import styled from 'styled-components';

export const EmptyImageContainer = styled.div`
  width: 250px;
  margin-inline: auto;
  height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  img {
    border-radius: 0.4rem;
    width: 200px;
    object-fit: cover;
  }

  p {
    text-align: center;
  }
`;
