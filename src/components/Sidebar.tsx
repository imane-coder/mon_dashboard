import React from 'react';
import { Drawer, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/" onClick={onClose}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/employees" onClick={onClose}>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem button component={Link} to="/EventConsumptionList" onClick={onClose}>
          <ListItemText primary="EventConsumptionList" />
        </ListItem>
        <ListItem button component={Link} to="/EquipmentManagement" onClick={onClose}>
          <ListItemText primary="EquipmentManagement" />
        </ListItem>
        <ListItem button component={Link} to="/EquipementsMateriels" onClick={onClose}>
          <ListItemText primary="EquipementsMateriels" />
        </ListItem>
        <ListItem button component={Link} to="/statistique" onClick={onClose}>
          <ListItemText primary="Statistique" /> 
        </ListItem>
        <ListItem button component={Link} to="/signin" onClick={onClose}>
          <ListItemText primary="Sign In" />
        </ListItem>
        <ListItem button component={Link} to="/forgot-password" onClick={onClose}>
          <ListItemText primary="Forgot Password" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
