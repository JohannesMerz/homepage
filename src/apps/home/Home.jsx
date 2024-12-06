import { Box, Headline, Paragraph } from '@bojagi/pablo';

export function Home() {
  return (
    <Box width="100%" display="flex" alignItems="center" flexDirection="column">
      <Headline>Johannes Merz</Headline>
      <Paragraph>This site is currently under construction.</Paragraph>
      {/* <Link href="/workout-timer">Workout Timer</Link> */}
    </Box>
  );
}
