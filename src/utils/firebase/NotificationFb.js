import { useEffect, useState } from 'react';
import { firestore } from '../../firebase/config';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection('notifications')
          .where('userId', '==', 'admin').orderBy('dateCreated','desc') 
          .onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotifications(data);
          });
    
        return () => {
          unsubscribe();
        };
      }, []); 
    
      return notifications;

}

export const addNotification = (userId, message) => {
    // Thêm thông báo mới vào collection 'notifications'
    firestore.collection('notifications').add({
        userId,
        message,
        dateCreated: new Date().toISOString(),
        read: false,
    });
};

export const markNotificationAsRead = async (notificationId) => {
    await firestore.collection('notifications').doc(notificationId).update({
        read: true,
    });
};



