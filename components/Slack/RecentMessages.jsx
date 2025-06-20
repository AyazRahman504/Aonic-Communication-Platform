import React from "react";
import "./RecentMessages.css";
import { Box, List, ListItem, Typography } from "@mui/material";
import useGetAllMessages from "./hook/useGetAllMessages";

const RecentMessages = () => {
  const { messageList, isFetching } = useGetAllMessages();

  const handleConvertTimestamp = (timestamp) => {
    if (!timestamp) return;
    const timestampInMs = parseInt(timestamp) * 1000;
    const date = new Date(timestampInMs).toLocaleString();
    return date;
  };

  return (
    <Box minWidth="100%">
      <h1>Recent Messages</h1>
      {messageList.length > 0 && (
        <List className="messageList">
          {messageList.slice(0, 10).map((item, index) => (
            <ListItem key={index} className="messageItem">
              <Box className="messageContent">
                <Typography className="name">{item.username}:</Typography>
                <Typography className="timestamp">
                  {handleConvertTimestamp(item.ts)}
                </Typography>
              </Box>
              <Typography className="messageText">
                Message: {item.text || "[No message]"}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}

      {messageList.length === 0 && isFetching === true && (
        <Typography variant="h6">Loading messages, please wait ...</Typography>
      )}

      {messageList.length === 0 && isFetching === false && (
        <Typography variant="h6" color="error">
          Something went wrong, can not get message list.
        </Typography>
      )}
    </Box>
  );
};

export default RecentMessages;
