import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { AccountContext } from "../contexts/AccountProvider";
import { getConversation } from "../service/addUser";

const ChatBox = () => {
  const { person, account } = useContext(AccountContext);

  

    // const fetchConversationDetails = async () => {
    //   try {
       
    //     const data = await getConversation({
    //       senderId: account.sub,
    //       receiverId: person.sub,
    //       page,
    //       pageSize,
    //     });

    //     if (data?.messages?.length) {
    //       console.log("Data fetched -> Messages:", data.messages, "HasMore:", data.hasMore);
    //       setMessages((prev) => [...prev, ...data.messages]); // Append new messages
    //       setHasMore(data.hasMore);
    //     } else {
    //       console.log("No more messages to fetch.");
         
    //     }
    //   } catch (error) {
    //     console.error("Error fetching conversation:", error);
    //   } 
    // };

    // useEffect(() => {
    //   fetchConversationDetails(); // Fetch initial messages when component mounts
  
    //   // Scroll listener or IntersectionObserver should be handled here
    //   // Trigger fetch when scrolling up and near top
    // }, [person]);

  return (
    <Box>
      <ChatHeader person={person} />
      <Messages
        person={person}

      />
    </Box>
  );
};

export default ChatBox;
