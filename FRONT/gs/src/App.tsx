import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Rotas from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <BrowserRouter>
      <Rotas/>
    </BrowserRouter>
  );
}

export default App;
