import React, { useEffect, useState, useContext, useRef } from "react";
import { getUsers } from "../service/addUser";
import { AccountContext } from "../contexts/AccountProvider";
import { Box, styled, Divider } from "@mui/material";
import Convo from "./Convo";

const Component = styled(Box)`
  overflow: auto;
  height: 81vh;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #8e8e8e;
  }
  scrollbar-width: thin;
  scrollbar-color: #a9a9a9 #f1f1f1;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversation = ({ text }) => {
  const { account, users, setUsers } = useContext(AccountContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const hasMore = useRef(true); 
  const containerRef = useRef(null);

  // Fetch users with pagination
  const getUsersFile = async () => {
    if (!hasMore.current || loading) return;
    setLoading(true);

    try {
      const data = await getUsers({ page, pageSize });
      if (data.users.length > 0) {
        setUsers((prev) => [...prev, ...data.users]);
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

  // Handle scroll to detect top
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop } = containerRef.current;

    // Trigger load if near top and has more data
    if (scrollTop < 50 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getUsersFile();
  }, [page]);

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  // Filter users by search term
  const filteredUsers = text
    ? users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      )
    : users;

  return (
    <Component ref={containerRef}>
      {filteredUsers.map(
        (user, index) =>
          user.sub !== account.sub && (
            <React.Fragment key={user.id || index}>
              <Convo user={user} />
              <StyledDivider />
            </React.Fragment>
          )
      )}
      
    </Component>
  );
};

export default Conversation;
