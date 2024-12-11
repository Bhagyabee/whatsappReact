import { useContext, useState } from "react";

import { Box, styled, Typography } from "@mui/material";
import { Chat as MessageIcon, MoreVert } from "@mui/icons-material";
import HeaderMenu from "./HeaderMenu";
import { AccountContext } from "../contexts/AccountProvider";
import InfoDrawer from "./InfoDrawer";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Component = styled(Box)`
  height: 44px;
 
  display: flex;
  padding: 10px;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    margin-left: 2px;
    padding: 8px;
    color: #000;
  }
  & :first-child {
    font-size: 22px;
    margin-right: 8px;
    margin-top: 3px;
  }
`;
const Title = styled(Typography)`
  font-size: 32px;
  font-family: inherit;
  font-weight: bold;
`;
const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
});

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { account } = useContext(AccountContext);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Component>
        {/* <Image src={account.picture} onClick={() => toggleDrawer()} /> */}
        <Title>Chats</Title>
        <Wrapper>
          <AddCommentIcon />
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
    </>
  );
};

export default Header;
