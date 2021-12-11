import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './component/Login';
import { Client } from './component/client/Client';

const App = () => {

  const [ client, setClient ] = useState(null);

  const logout = () => setClient(null);

  return (
    <Container fluid="sm">
    <h1 className="mb-5">Bank App</h1>
    {(!client && <Login setClient={ setClient } />)
    ||
    <Client client={ client } logout={ logout } />
    }
    </Container>
  );
}

export default App;
