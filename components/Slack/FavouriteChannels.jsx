import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./RecentMessages.css";
import { Box, List, ListItem, Typography } from "@mui/material";

const RecentMessages = () => {
  const [messageList, setMessageList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleGetMessage = async () => {
    try {
      const axiosOptions = {
        //method: "GET",
        //url: "https://slack.com/api/conversations.history?channel=C0467LR8T6H",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          //Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        withCredentials: false,
      };

      const response = await axios(axiosOptions);

      if (response.status === 200) {
        const { messages } = response.data;
        return messages;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleGetUserName = useCallback(async () => {
    setIsFetching(true);
    const messages = await handleGetMessage();

    Promise.all(
      messages.map(async (item, index) => {
        if (!item?.user) {
          messages[index].username = "BOT";
          return;
        }

        const axiosOptions = {
          method: "GET",
          //url: `https://slack.com/api/users.info?user=${item.user}`,
          //headers: {
           // "content-type": "application/x-www-form-urlencoded",
            //Authorization: `Bearer ${BEARER_TOKEN}`,
          },
          withCredentials: false,
        };

        const response = await axios(axiosOptions);

        if (response.status === 200) {
          const { user } = response.data;
          messages[index].username = user.name;
        } else {
          console.error("Something went wrong, can not get message list.");
        }
      })
    ).then(() => {
      setIsFetching(false);
      setMessageList(messages);
    });
  }, []);

  const handleConvertTimestamp = (timestamp) => {
    if (!timestamp) return;
    const timestampInMs = parseInt(timestamp) * 1000;
    const date = new Date(timestampInMs).toLocaleString();
    return date;
  };

  useEffect(() => {
    handleGetUserName();
  }, [handleGetUserName]);

  return (
    <Box minWidth="100%">
      <h1>Favourite Channel</h1>
      <h3>Channel Name: Test-Project 2</h3>
      {messageList.length > 0 && (
        <List className="messageList">
          {messageList.slice(0, 10).map((item, index) => {
            return (
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
            );
          })}
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

