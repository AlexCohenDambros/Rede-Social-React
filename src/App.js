import React from 'react';
import './App.css';
import Rotas from './rotas';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function App() {



  return (
    <div className="app">
      <BrowserRouter>
        <CookiesProvider>
          <Rotas />
        </CookiesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;