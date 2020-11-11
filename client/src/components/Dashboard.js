import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function Dashboard() {
  const [response, setResponse] = React.useState();

  const makeRequest = async () => {
    const r = await fetch('/hello');
    const rText = await r.text();

    setResponse(rText);
  }

  return (
    <Container>
      <Row>
        <Button onClick={makeRequest}>Hello</Button>
        </Row>
      <Row>{JSON.stringify(response)}</Row>
    </Container>
  );
}
