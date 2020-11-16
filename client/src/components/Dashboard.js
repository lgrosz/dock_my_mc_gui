import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styled from 'styled-components'

// todo componentize the parts of the dashboard

const LogContainer = styled.pre`
  height: 75vh;
  overflow-y: auto;
`

const Log = styled.pre`
  white-space: pre-wrap;
`

export default function Dashboard() {
  const [ws, setWs] = React.useState();
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/console');

    ws.onopen = () => {
      console.log('Connected to web socket.');
    };

    ws.onmessage = (msg) => {
      logs.push(msg.data);
      setLogs([...logs]);
      console.log(msg.data);
    };

    setWs(ws);
  }, []);

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
      <Row>
        <Form>
          <Form.Group>
            <Form.Control as="div">
              <LogContainer>
                {logs.map(log => <Log>{log}</Log>)}
              </LogContainer>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="say Hi" />
          </Form.Group>
        </Form>
      </Row>
      <Row>
      </Row>
    </Container>
  );
}
