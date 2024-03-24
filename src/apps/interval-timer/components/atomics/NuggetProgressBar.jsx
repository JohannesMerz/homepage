import { prop } from 'ramda';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: 'space-between';
  gap: 3px;
  width: 100%;
`;

const Nugget = styled.div`
  height: 6px;
  border-radius: 3px;
  flex-grow: 1;
  background-color: ${prop('$backgroundColor')};
  opacity: ${(props) => (props.$active ? 1 : 0.33)};
`;

export function NuggetProgressBar({ className, nuggetCount, progress, color }) {
  return (
    <Box className={className}>
      {Array.from(Array(nuggetCount).keys()).map((_, i) => (
        <Nugget
          key={i}
          $backgroundColor={color}
          $active={i < progress}
        ></Nugget>
      ))}
    </Box>
  );
}
