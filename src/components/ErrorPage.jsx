import { Box, Headline, Paragraph } from '@bojagi/pablo';
import { Link, useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box id="error-page">
      <Headline>Oops!</Headline>
      <Paragraph>Sorry, an unexpected error has occurred.</Paragraph>
      <Paragraph>
        <i>{error.statusText || error.message}</i>
      </Paragraph>
      <Link to="/">back</Link>
    </Box>
  );
}
