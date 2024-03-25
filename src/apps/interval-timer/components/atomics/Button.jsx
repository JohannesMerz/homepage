import { propOr } from 'ramda';
import styled from 'styled-components';

export const Button = styled.button`
  background-color: transparent;
  border: 2px solid ${propOr('var(--colorPrimary)', 'color')};
  border-radius: 15%;
  display: flex;
  padding: 3px;
  align-items: center;
  opacity: ${(props) => (props.disabled ? '0.33' : '1')};
`;
