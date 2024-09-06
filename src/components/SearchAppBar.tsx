import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode'; 
import LightModeIcon from '@mui/icons-material/LightMode'; 
import { useNavigate } from 'react-router-dom';
import useNotifications from './useNotifications'; 
import NotificationList from './NotificationList'; 

interface SearchAppBarProps {
  onMenuClick: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const SearchAppBar: React.FC<SearchAppBarProps> = ({ onMenuClick, onThemeToggle, isDarkMode }) => {
  const navigate = useNavigate();
  const { notifications } = useNotifications(); 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ height: '60px', backgroundColor: '#4A4A4A' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onThemeToggle}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={() => navigate('/signin')}>
            Sign In
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            {notifications.length > 0 ? (
              <NotificationList notifications={notifications} />
            ) : (
              <MenuItem>Aucune notification</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar /> 
    </>
  );
};

export default SearchAppBar;
