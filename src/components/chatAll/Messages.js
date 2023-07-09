import React, { useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import Message from "./Message";

const Messages = () => {
  const { messages } = useContext(MessageContext);

  return (
    <div className="messages">
      {messages.map((m, index) => (
        <div key={index}>
          <Message message={m} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
