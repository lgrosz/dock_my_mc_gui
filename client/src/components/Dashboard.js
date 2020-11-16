import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Dashboard() {
  const [response, setResponse] = React.useState();
  const [ws, setWs] = React.useState();

  React.useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/console');

    ws.onopen = () => {
      console.log('Connected to web socket.');
    };

    ws.onmessage = (msg) => {
      console.log(msg.data);
    };

    setWs(ws);
  }, []);

  const makeRequest = async () => {
    const r = await fetch('/hello');
    const rText = await r.text();

    setResponse(rText);
  }

  const startServer = () => {
    ws.send('start');
  }

  const stopServer = () => {
    ws.send('stop');
  }

  return (
    <Container>
      <Row>
        <ButtonGroup>
          <Button onClick={startServer}>Start</Button>
          <Button onClick={stopServer}>Stop</Button>
        </ButtonGroup>
      </Row>
      <Row>{JSON.stringify(response)}</Row>
    </Container>
  );
}
