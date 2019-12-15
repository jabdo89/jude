import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import App from './App';
import ReduxWrapper from './redux';

ReactDOM.render(
  <ReduxWrapper>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ReduxWrapper>,
  document.getElementById('root')
);
