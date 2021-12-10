import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './component/Login';
import { Client } from './component/client/Client';

const App = () => {

  const [ client, setClient ] = useState(null);

  return (
    <>
    <h1>Bank App</h1>
    {(client === null) && <Login setClient={ setClient } />}
    {client && <Client client={ client } />

    }
    </>
  );
}

export default App;
