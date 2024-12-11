import React, { useContext } from "react";
import LoginDialog from "./LoginDialog";
import ChatDialog from "./ChatDialog";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import { AccountContext } from "../contexts/AccountProvider";
import { Margin } from "@mui/icons-material";

const Component = styled(Box)`
  height: 100vh;
  width: 100vh;
  margin-left: 0px;
  background: #dcdcdc;
`;

const Header = styled(AppBar)`
  background-color: #00a884;
  height: 125px;
  width:100vh;
  box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
  background: #00bfa5;
  height: 200px;
  box-shadow: none;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      {account ? (
        <>
          {/* <Header>
                        <Toolbar></Toolbar>
                    </Header> */}
          <ChatDialog />
        </>
      ) : (
        <>
          <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
};

export default Messenger;
