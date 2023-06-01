import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/messagesSlice";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";

const Form = styled("form")({
  display: "flex",
  justifyContent: "center",
  width: "95%",
  margin: "8px auto",
});

const Text = styled(TextField)({
  width: "100%",
});

const SendButton = styled(Button)({
  marginLeft: "8px",
});

const TextInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>(); 
  const {loading} = useSelector((state: RootState) => state.messages);
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(message.trim() !== '') {
        dispatch(addMessage({
          message: {
            message: message,
            timestamp: new Date().toISOString(),
            role: 'user'
          },
          shouldAddImmediately: true
        }));
    
      setMessage("");
    }
  };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as any);
    }
  };

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSend}>
      <Text
        id="outlined-basic"
        label="Type your message here"
        variant="outlined"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={loading}
        multiline
      />
      <SendButton
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        disabled={!message.trim()}
        type="submit"
      >
        Send
      </SendButton>
    </Form>
  );
};

export default TextInput;
