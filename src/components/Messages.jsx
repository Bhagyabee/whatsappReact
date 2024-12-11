import React, { useRef, useEffect, useState, useCallback, useContext } from "react";
import { Box, styled } from "@mui/material";
import Message from "./Message";
import { getConversation } from "../service/addUser";
import ChatFooter from "./ChatFooter";
import { AccountContext } from "../contexts/AccountProvider";

const Wrapper = styled(Box)`
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-size: 50%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Component = styled(Box)`
  display: flex;
  flex-direction: column; /* Maintain chronological order */
  overflow-y: auto;
  height: 82vh;
   &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
`;

const Messages = ({ person }) => {
  const { account } = useContext(AccountContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const hasMore = useRef(true); 
  const containerRef = useRef();
  const observer = useRef();
  const [isUserScrolling, setIsUserScrolling] = useState(true);
  const [initial,setInitial]= useState(true);
  

  const loadMore = async () => {
    if (!hasMore.current || loading) return;
    setLoading(true);

    try {
      const data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
        page,
        pageSize,
      });
      console.log(person.sub)

      if (data.messages.length > 0) {
        setMessages((prev) => [...data.messages, ...prev]); 
        hasMore.current = data.hasMore;
      } else {
        hasMore.current = false; 
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleScroll = () => {
    const scrollContainer = containerRef.current;
    const isAtBottom =
      scrollContainer.scrollHeight === scrollContainer.scrollTop + scrollContainer.clientHeight;
    
    setIsUserScrolling(!isAtBottom); 
  };

  useEffect(() => {
    const scrollContainer = containerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);
    
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
 

  useEffect(() => {
    loadMore();
    
  }, [person,page]);

  const firstPostElementRef = useCallback(
    (node) => {
      if (loading || !hasMore.current) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("First message is visible, loading previous messages...");
          setPage((prevPage) => prevPage +1);
          
        }
      }, {
        root: containerRef.current, 
        rootMargin: "0px",
        threshold: 0, 
      });

      if (node) observer.current.observe(node);
    },
    [loading,person]
  );

  
  useEffect(() => {
    if (containerRef.current ) {
      if(initial){ containerRef.current.scrollTop = containerRef.current.scrollHeight;
        setInitial(false)
      }
      else{ containerRef.current.scrollTop = containerRef.current.scrollHeight-containerRef.current.scrollHeight+500;}
       
    }
  }, [messages,person]); 
  return (
    <Wrapper >
      <Component ref={containerRef} >
        {loading && <p>Loading...</p>}
        {messages.map((message, index) => {
          const isFirst = index === 0; // Identify the first message
          return (
            <div key={message.id} ref={isFirst ? firstPostElementRef : null}>
              <Message message={message} />
            </div>
          );
        })}
      </Component>
      <ChatFooter sendText={() => {}} />
    </Wrapper>
  );
};

export default Messages;
