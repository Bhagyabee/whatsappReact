import { Box, styled } from "@mui/material";
import React, { useContext, useState } from "react";
import Users from "../constants/users.json";
import { AccountContext } from "../contexts/AccountProvider";

const Component = styled(Box)`
  height: 44px;
  display: flex;
  padding: 0px 16px;
  padding-bottom: 7px;
  border-bottom: 1px solid #F2F2F2;
  align-items: center;
`;

const Wrapper = styled(Box)`
  height: 44px;
  width: 100%;
  display: flex;
  padding-bottom: 17px;
  align-items: center;
`;

const Item = styled(Box)`
  padding: 6px;
  border-radius: 19px;
  background-color: #f0f2f5;
  width: 100%;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
    color: green;
  }
  color: grey;
  font-weight: 500;
`;

const DefaultItem = styled(Box)`
  padding: 6px;
  border-radius: 19px;
  background-color: #f0f2f5;
  width: 100%;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
  background-color: #cef6d0;
  color: green;
  font-weight: 500;
`;

const ItemContainer = styled(Box)`
  height: 20px;
  text-align: center;
  padding: 16px;
  align-items: center;
`;

const HeaderOptions = () => {
  const [chosen, setChosen] = useState("All"); // Track the selected option
  const { setUsers } = useContext(AccountContext);

  const filterUsers = (category) => {
    setChosen(category); // Update the chosen state to apply styles dynamically

    if (category === "All") {
      setUsers(Users); // Reset to the full user list
    } else {
      const filteredUsers = Users.filter((user) => user[category] === true);
      setUsers(filteredUsers);
    }
  };

  const getStyledItem = (option) => (chosen === option ? DefaultItem : Item);

  return (
    <Component>
      <Wrapper>
        <ItemContainer>
          <Box
            as={getStyledItem("All")}
            onClick={() => filterUsers("All")}
          >
            All
          </Box>
        </ItemContainer>

        <ItemContainer>
          <Box
            as={getStyledItem("isUnread")}
            onClick={() => filterUsers("isUnread")}
          >
            Unread
          </Box>
        </ItemContainer>

        <ItemContainer>
          <Box
            as={getStyledItem("isFavourite")}
            onClick={() => filterUsers("isFavourite")}
          >
            Favourites
          </Box>
        </ItemContainer>

        <ItemContainer>
          <Box
            as={getStyledItem("isGroup")}
            onClick={() => filterUsers("isGroup")}
          >
            Groups
          </Box>
        </ItemContainer>
      </Wrapper>
    </Component>
  );
};

export default HeaderOptions;
