import { Dialog, Box, styled } from "@mui/material";
import Menu from "./Menu";
import EmptyChat from "./EmptyChat";
import React, { useCallback, useContext } from "react";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";
import { AccountContext } from "../contexts/AccountProvider";

const Component = styled(Box)`
  display: flex;
`;
const LeftComponent = styled(Box)`
  min-width: 500px;
  padding-left: 10px;
  padding-right: 10px;

  border-right:1px solid #efefef
`;
const RightComponent = styled(Box)`
min-width: 450px;
width:852px,
height:100%,
border-left:1px solid black;
`;
const SidebarComponent = styled(Box)`
  width:71px ;
  height:100% ;
  border-right:1px solid #efefef
`;

const dialogStyle = {
  height: "100%",
  width: "100%",
  margin: "0px",
  borderRadius: 0,
  maxWidth: "100%",
  maxHeight: "100%",
  overflow: "hidden",
};

const ChatDialog = () => {
  const {person}= useContext(AccountContext);
  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
      maxWidth={"md"}
    >
      <Component>
        <SidebarComponent>
          <Sidebar />
        </SidebarComponent>
        
        <LeftComponent>
          <Menu></Menu>
        </LeftComponent>
        <RightComponent style={{width:'852px'}}>
          {/* <EmptyChat></EmptyChat> */}
          {/* <ChatBox/> */}
          {Object.keys(person).length ? <ChatBox/> : <EmptyChat/>}
        </RightComponent>
      </Component>
    </Dialog>
  );
};

export default ChatDialog;
