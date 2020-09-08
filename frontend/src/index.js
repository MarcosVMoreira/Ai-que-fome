import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import customTheme from './assets/themes/theme.json';
import Routes from './routes/routes';

import './index.css';

const theme = createMuiTheme(customTheme);

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
