import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchAppBar from './SearchAppBar';

interface LayoutProps {
  children: React.ReactNode;
  onMenuClick: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  onMenuClick,
  onThemeToggle,
  isDarkMode,
  sidebarOpen,
  onSidebarClose,
}) => {
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });


  const location = useLocation();

  const hideAppBar = location.pathname === '/signin' || location.pathname === '/forgot-password';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar open={sidebarOpen} onClose={onSidebarClose} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, ml: sidebarOpen ? '240px' : '0px' }}
        >
          {!hideAppBar && (
            <SearchAppBar 
              onMenuClick={onMenuClick} 
              onThemeToggle={onThemeToggle} 
              isDarkMode={isDarkMode} 
            />
          )}
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
