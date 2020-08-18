import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';

import App from './App';
import ReduxWrapper from './redux';

ReactDOM.render(
  <ReduxWrapper>
    <ThemeProvider theme={theme}>
      <Router basename="/">
        <App />
      </Router>
    </ThemeProvider>
  </ReduxWrapper>,
  document.getElementById('root')
);

// Read Docs for Info on Components
// https://ui.blockdemy.com/?path=/story/welcome--to-blockdemy-ui
