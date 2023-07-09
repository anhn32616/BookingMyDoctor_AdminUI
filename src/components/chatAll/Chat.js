import React, { useContext, useState } from "react";
import Messages from "./Messages";
import Input from "./InputMessage";
import { MessageContext } from "../../Context/MessageContext";
import avatarUserDefault from "../../assets/images/user.png"
import styled from "styled-components";


const Chat = () => {
  const { selectedUser } = useContext(MessageContext);
  console.log(selectedUser);

  const [hasError, setHasError] = useState(false);

  const imageStyle = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover',
  }

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div className="chat">
      <div className="chatInfo" style={{ display: "flex", alignItems: "center", justifyContent:"left" }}>
        {selectedUser &&
          (<>
            {hasError ? (
              <img style={imageStyle} src={avatarUserDefault} alt="Default Image" />
            ) : (
              <img style={imageStyle} src={selectedUser.image} alt="Image" onError={handleImageError} />
            )
            }
            <h4 style={{ textAlign: 'center', color: 'white', marginLeft: 10 }}>{selectedUser.fullName}</h4>
          </>)
        }
      </div>
      {selectedUser ? 
      (<><Messages />
      <Input /></>) : <img style={{margin: 'auto'}} src="https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png" alt="background-image"></img>}
    </div>
  );
};

export default Chat;


const SendMessageStyle = styled.div`
    .typing {
        height: 50px;
        border-top: 1px solid;
        padding-right: 20px;
        background: rgb(255, 255, 255);
        border-top-color: rgb(234, 234, 234);
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 20px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .input-message {
        flex: 1 0 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 0 0px;
    }

    .input-message input {
        font-size: 16px;
        line-height: 20px;
        height: 100%;
        padding: 0 20px;
        background: transparent;
        border: 0;
        outline: none;
        font-family: Source Sans Pro,sans-serif;
    }


    .button-send {
        width: 26px;
        height: 26px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 26px;
        flex: 0 0 26px;
        -webkit-backface-visibility: hidden;
        -webkit-transition: all .3s;
        transition: all .3s;
        cursor: pointer;
    }
`;