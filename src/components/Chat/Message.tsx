import React from "react";
import { Avatar, Divider } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { styled } from "@mui/system";
import { format } from 'date-fns';
import { useSelector } from "react-redux";

const MessageRow = styled('div')({
  display: "flex",
});

const MessageRowRight = styled('div')({
  display: "flex",
  justifyContent: "flex-end",
});

const MessageBlue = styled('div')({
  position: "relative",
  marginLeft: "20px",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#A8DDFD",
  minWidth: "60%",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #97C6E3",
  borderRadius: "10px",
});

const MessageOrange = styled('div')({
  position: "relative",
  marginRight: "20px",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#f8e896",
  minWidth: "60%",
  textAlign: "left",
  font: "400 .9em 'Open Sans', sans-serif",
  border: "1px solid #dfd087",
  borderRadius: "10px",
});

const MessageContent = styled('p')({
  padding: 0,
  margin: 0,
  whiteSpace: "pre-wrap"
});

const MessageHeader = styled('div')({
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
});

const MessageDisplayName = styled('div')({
  marginLeft: "10px",
  fontWeight: "bold",
});

const MessageTimeStamp = styled('div')({
  fontSize: ".85em",
  fontWeight: 300,
  marginTop: "10px",
  alignSelf: "flex-end",
});

function getContrastText(background: any) {
  const rgb = parseInt(background.slice(1), 16);   // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;  // extract red
  const g = (rgb >>  8) & 0xff;  // extract green
  const b = (rgb >>  0) & 0xff;  // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma < 128 ? 'white' : 'black';
}

const OrangeAvatar = styled(Avatar)(({ theme }) => ({
  color: getContrastText(deepOrange[500]),
  backgroundColor: deepOrange[500],
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

interface MessageProps {
  message?: string;
  timestamp?: string;
  photoURL?: string;
  displayName?: string;
  role?: string;
}

export const MessageLeft: React.FC<MessageProps> = (props) => {
  const { message = "no message", timestamp = "", photoURL = "dummy.js", displayName = "CVGenius" } = props;
  const formattedTimestamp = format(timestamp? new Date(timestamp) : new Date(), 'MM/dd HH:mm');
  return (
    <MessageRow>
      <OrangeAvatar alt={displayName} src={photoURL} />
      <div>
        <MessageHeader>
          <MessageDisplayName>{displayName}</MessageDisplayName>
          <Divider orientation="vertical" flexItem />
        </MessageHeader>
        <MessageBlue>
          <MessageContent>{message}</MessageContent>
          </MessageBlue>
        <MessageTimeStamp>{formattedTimestamp}</MessageTimeStamp>
      </div>
    </MessageRow>
  );
};

export const MessageRight: React.FC<MessageProps> = (props) => {
  const {fullName} = useSelector((state: any) => state.form.personalDetails); 
  fullName?.length > 1 ? fullName.split(" ")[0] : fullName
  const { message = "no message", timestamp = "", displayName = fullName || 'User' } = props;
  const formattedTimestamp = format(timestamp? new Date(timestamp) : new Date(), 'MM/dd HH:mm');
  
  return (
    <MessageRowRight>
      <div>
        <MessageHeader>
          <MessageDisplayName>{displayName}</MessageDisplayName>
          <Divider orientation="vertical" flexItem />
        </MessageHeader>
        <MessageOrange>
          <MessageContent>{message}</MessageContent>
        </MessageOrange>
        <MessageTimeStamp>{formattedTimestamp}</MessageTimeStamp>
      </div>
    </MessageRowRight>
  );
};

export default MessageLeft;

