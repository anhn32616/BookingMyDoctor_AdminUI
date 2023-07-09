
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase/config';
import userApi from '../api/userApi';


export const MessageContext = React.createContext();

export default function MessageProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]); // messages chat all users
  const [users, setUsers] = useState([]);
  const [usersListFb, setUsersListFb] = useState([]);
  const [listMessageData, setListMessageData] = useState([]);
  const messageCollection = firestore.collection('messages');
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        var res = await userApi.getMyProfile()
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser()
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      messageCollection.where('receiverId', '==', currentUser?.id)
        .onSnapshot((querySnapshot) => {
          let listMessageData = [];
          querySnapshot.forEach((doc) => {
            listMessageData.push(doc.data())
          });
          setListMessageData((pre) => [...pre, ...listMessageData])
        });
    }
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {

    if (currentUser?.id) {
      messageCollection.where('senderId', '==', currentUser?.id)
        .onSnapshot((querySnapshot) => {
          let listMessageData = [];
          querySnapshot.forEach((doc) => {
            listMessageData.push(doc.data())
          })
          setListMessageData((pre) => [...pre, ...listMessageData])
        });
    }
    // eslint-disable-next-line
  }, [currentUser]);


  useEffect(() => {
    const userListFb = [];
    const lsm = listMessageData.sort((a, b) => b.createAt - a.createAt)
   
    lsm.forEach((messageData) => {
      const userId = messageData.senderId == currentUser.id ? messageData.receiverId : messageData.senderId;
      // Kiểm tra xem người dùng đã tồn tại trong danh sách chưa
      const existingUser = userListFb.find((user) => user.id === userId);

      // Nếu người dùng không tồn tại, thêm vào danh sách
      if (!existingUser) {
        userListFb.push({
          id: userId,
          lastMessage: {
            senderId: messageData.senderId,
            content: messageData.content
          },
        });
      }
    })
    setUsersListFb([...userListFb])
  }, [listMessageData])

  useEffect(() => {
    userApi.getBaseProfile().then((response) => {
      var usesDatabase = response?.data
      const userList = [];
      usersListFb.forEach(userFB => {
        var user = usesDatabase.find(u => u.id == userFB.id);
        user && userList.push({ ...user, ...userFB });
      })
      setUsers(userList);
    }).catch((e) => {
      console.log(e.messages);
    })
  }, [usersListFb])

  useEffect(() => {
    if (selectedUser) {
      var selectId = selectedUser.id;
      const unsubscribe = messageCollection
        .where('senderId', 'in', [currentUser.id, selectId])
        .where('receiverId', 'in', [currentUser.id, selectId])
        .orderBy('createAt')
        .onSnapshot((querySnapshot) => {
          const messageList = [];
          querySnapshot.forEach((doc) => {
            const messageData = doc.data();
            messageList.push(messageData);
          });
          setMessages(messageList);
        });
        return () => unsubscribe();
    } else {
      setMessages([]);
    }
    // eslint-disable-next-line
  }, [selectedUser]);


  return (
    <MessageContext.Provider
      value={{
        currentUser, users, setUsers, selectedUser, setSelectedUser, messages, setMessages
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
