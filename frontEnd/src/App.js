import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useState} from 'react';
import { useRoutes, Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import SignUpLoginForm from 'src/views/auth/SignupLoginForm';

const App = () => {
  const userId = localStorage.getItem("id") || false
  const routing = useRoutes(routes);
  const [loggedIn, setLoggedIn] = useState(userId?true:false)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {!loggedIn && 
      <SignUpLoginForm onLogIn = {setLoggedIn} />
      }
      { loggedIn && routing}
    </ThemeProvider>
  );
};

export default App;
