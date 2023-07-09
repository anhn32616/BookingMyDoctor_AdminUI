import React, { useContext, useEffect } from 'react'
import Sidebar from '../../components/chatAll/Sidebar'
import Chat from '../../components/chatAll/Chat'
import './style.scss'
import { MessageContext } from '../../Context/MessageContext'
import userApi from '../../api/userApi'
import { useParams } from 'react-router-dom'

const ChatPage = () => {
  const userId = useParams().id - 0;
  const { setSelectedUser, users } = useContext(MessageContext)
  useEffect(() => {
    if (userId != NaN) {
      console.log('userId', userId)
      const userChat = users.find(user => user.id === userId)
      if (userChat) {
        setSelectedUser({ ...userChat })
      }
      else {
        (async () => {
          try {
            if(userId) {
              const respone = await userApi.getBaseProfileById(userId)
              setSelectedUser({ ...respone.data[0] })
            }
          }
          catch (err) {
            return err.message
          }
        }
        )()
      }
    }
  }, [userId])
  return (
    <div className='home'>
      <div className="container-chat">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default ChatPage