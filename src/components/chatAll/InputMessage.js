import React, { useContext, useState } from "react";
import { MessageContext } from "../../Context/MessageContext";
import firebase, { firestore } from "../../firebase/config";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";


const InputMessage = () => {
  const [text, setText] = useState("");

  const { selectedUser, currentUser } = useContext(MessageContext);

  const handleSend = async () => {
    if (!text) return;
    // Add message from user to admin AnhNT282
    const userAdminRef = firestore.collection('messages');

    const chatData = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content: text,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // Make adding messages to Firestore AnhNT282
    userAdminRef.add(chatData)
      .then(() => {
        console.log('Success!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setText('');
  };
  return (
    <div className="input">
      {/* <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      /> */}
          <Input
          value={text}
          onChange={(e) => {setText(e.target.value)}}
          onPressEnter={handleSend}
          placeholder='Type something...'
          bordered={false}
          autoComplete='off'
          color=""
        />
      <div className="send">
        <SendOutlined className="icon-send" onClick={handleSend}
          style={{
            fontSize: '32px',
            marginLeft: "10px",
            marginRight: "20px",
            color: text ? "#007aec" : "#000000bd"
          }}
        />
      </div>
    </div>
  );
};

export default InputMessage;
