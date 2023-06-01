import React, {useEffect} from "react";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import TextInput from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../redux/store";
import { addMessage } from "@/redux/messagesSlice";
import { AppDispatch } from "../../redux/store";


const Container = styled('div')({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
});

const StyledPaper = styled(Paper)({
  width: "80vw",
  height: "80vh",
  maxWidth: "500px",
  maxHeight: "700px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
});

const MessagesBody = styled(Paper)({
  width: "calc( 100% - 20px )",
  margin: 10,
  overflowY: "scroll",
  height: "calc( 100% - 80px )",
});

const Chat: React.FC = () => {
  const {messages, loading} = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(addMessage({
      message: {
        message: '',
        timestamp: '',
        role: 'assistant'
      },
      shouldAddImmediately: false
    }));
  }, []);
  
  
  return (
    <Container>
      <StyledPaper elevation={2}>
        <MessagesBody id="style-1">
          {messages.map((message, index) =>
            message.role === 'assistant' ? (
              <MessageLeft
                key={index}
                message={message.message}
                timestamp={message.timestamp}
                photoURL={message.photoURL}
                displayName={message.displayName}
              />
            ) : (
              <MessageRight
                key={index}
                message={message.message}
                timestamp={message.timestamp}
              />
            )
          )}
          {loading && (
            <MessageLeft
              message="Typing..."
              timestamp=""
              photoURL=""
              displayName="Assistant"
            />
          )}
        </MessagesBody>
        <TextInput />
      </StyledPaper>
    </Container>
  );
};

export default Chat;
