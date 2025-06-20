import React, { useEffect, useState, useCallback } from "react";
import "./FavouriteUsers.css";
import { Box, List, ListItem, Typography } from "@mui/material";
import useGetAllMessages from "./hook/useGetAllMessages";

const FavouriteUsers = () => {
  const { messageList, isFetching } = useGetAllMessages();

  const [favouriteUserMessage, setFavouriteUserMessage] = useState([]);

  const handleConvertTimestamp = (timestamp) => {
    if (!timestamp) return;
    const timestampInMs = parseInt(timestamp) * 1000;
    const date = new Date(timestampInMs).toLocaleString();
    return date;
  };

  const handleFilterMessage = useCallback(() => {
    const messages = messageList.filter(
      (item) => item.username === FAVOURITE_USER
    );

    setFavouriteUserMessage(messages);
  }, [messageList]);

  useEffect(() => {
    if (messageList.length > 0 && isFetching === false) {
      handleFilterMessage();
    }
  }, [handleFilterMessage, messageList, isFetching]);

  return (
    <Box minWidth="100%">
      <h1>Favourite User</h1>
      <h3>Username: {FAVOURITE_USER}</h3>
      {favouriteUserMessage.length > 0 && (
        <List className="messageList">
          {favouriteUserMessage.slice(0, 10).map((item, index) => (
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

      {favouriteUserMessage.length === 0 && isFetching === true && (
        <Typography variant="h6">Loading messages, please wait ...</Typography>
      )}

      {favouriteUserMessage.length === 0 && isFetching === false && (
        <Typography variant="h6" color="error">
          User does not have any messages.
        </Typography>
      )}
    </Box>
  );
};

export default FavouriteUsers;
