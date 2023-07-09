import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../Context/MessageContext";
import avatarUserDefault from "../../assets/images/user.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const Chats = () => {

  const [hasError, setHasError] = useState(false);
  const history = useHistory()

  const handleImageError = () => {
    setHasError(true);
  };


  const { users, selectedUser, currentUser } = useContext(MessageContext);


  return (
    <div className="chats">
      {users && users.map((user) => (
        <div
          key={user.id}
          className={selectedUser ? (selectedUser.id == user.id ? "userChat userChat-selected" : "userChat") : "userChat"}
          onClick={() => history.push(`/chat/${user.id}`)}
          style={{ paddingLeft: 20 }}
        >
          <div>
            {hasError ? (
              <img src={avatarUserDefault} alt="Default Image" style={{ border: "1px solid #000" }} />
            ) : (
              <img src={user.image} alt="Image" onError={handleImageError} style={{ border: "1px solid #000" }} />
            )}
          </div>
          <div className="userChatInfo">
            <span style={{ color: "#2196F3" }}>{user.fullName}</span>
            {user.lastMessage?.senderId == currentUser.id ? <p style={{ color: "#000" }}>You: {user.lastMessage?.content}</p> : <p>{user.lastMessage?.content}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
