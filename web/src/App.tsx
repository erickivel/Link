import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';
import { AppStateProvider } from './hooks/apollo';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes />
      </AppStateProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
