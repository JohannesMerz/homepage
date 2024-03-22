import styled from 'styled-components';

const Box = styled.span``;

export function Time({ time }) {
  const secondsExact = time / 1000;

  const seconds = Math.floor(secondsExact);
  const hundreds = Math.floor((secondsExact - seconds) * 100);

  return (
    <Box>
      {seconds}.{hundreds}s
    </Box>
  );
}
