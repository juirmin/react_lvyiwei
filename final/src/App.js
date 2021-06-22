import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import routes from './routes';
import React from 'react';
import { Provider } from "./Context";
import { Actions } from "./Actions";

const App = () => {
  const data = Actions();
  console.log(data)
  const routing = useRoutes(routes);
  return (
    <Provider value={data}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
