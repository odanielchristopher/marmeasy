import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import { AuthProvider } from '@renderer/contexts/AuthContext';
import Profile from '@renderer/views/pages/Profile';
import AppRoutes from '../../Routes';
import ToastContainer from '../Toast/ToastContainer';

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Profile />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}
