import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Notification } from './useNotifications';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <List>
      {notifications.map((notification) => (
        <ListItem key={notification.id}>
          <ListItemText
            primary={notification.message}
            secondary={notification.timestamp.toLocaleString()} 
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;
