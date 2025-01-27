import styled from 'styled-components';

export const StyledDayPickerWrapper = styled.div`
  background-color: #fff; /* Cor de fundo clara */
  padding: 2rem; /* Espaçamento interno */
  border-radius: 0.5rem; /* Bordas arredondadas */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
  display: inline-block; /* Garante que o tamanho seja adequado ao conteúdo */

  .rdp-caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rdp-nav {
    display: flex;
    gap: 0.25rem;
  }

  .rdp-nav_button_previous,
  .rdp-nav_button_next {
    color: #0d9488;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent !important;
  }

  .rdp-head_cell {
    text-transform: uppercase;
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
    padding-top: 0.25rem;
    padding-bottom: 0.5rem;
  }

  .rdp-day_button {
    background: transparent;
    margin: 0.5rem;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 6px;
    width: 40px;

    border: var(--rdp-day_button-border);

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.orange.main}; /* Cor ao passar o mouse */
      border-radius: 4px;
    }
  }

  .rdp-nav {
    display: flex;
    align-items: center;
    margin-left: auto;
    justify-content: end;
  }

  .rdp-button_previous,
  .rdp-button_next {
    margin: 0 0.25rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .rdp-weekday {
    padding: 0.75rem 1rem; /* Aumenta o espaçamento interno dos dias da semana */
    text-align: center;
    font-size: 1.5rem;
  }
`;
