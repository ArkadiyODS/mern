import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RenderRoutes } from './pages/index.js';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useHttp } from './hooks';
import AuthContext from './contexts/authContext';
import 'materialize-css';

import './App.css';

function App() {
  const auth = useHttp();
  return (
    <div className='container'>
      <Provider store={store}>
        <AuthContext.Provider value={auth}>
          <Router>{RenderRoutes(auth.authenticated)}</Router>
        </AuthContext.Provider>
      </Provider>
      <div>{auth.error}</div>
    </div>
  );
}

export default App;
