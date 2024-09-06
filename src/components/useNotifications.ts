import { useState } from 'react'; 

export interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now(), 
      message,
      timestamp: new Date(), 
    };
    setNotifications((prevNotifications: Notification[]) => [...prevNotifications, newNotification]);
  };

  return {
    notifications,
    addNotification,
  };
};

export default useNotifications;
