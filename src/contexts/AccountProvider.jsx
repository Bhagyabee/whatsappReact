import { createContext,useState,useRef,useEffect, Children } from "react";

export const AccountContext = createContext(null);

const AccountProvider = ({children})=>{
    const [account,setAccount]= useState();
    const [users, setUsers] = useState([]);
    const [person,setPerson]= useState({});
    const [messageList, setMessagesList] = useState([]);

    const [conversations, setConversations] = useState([]);

    const setConversation = (newConversation)=>{
        const exists = conversations.some((conv)=>{
            conv.members.includes(newConversation.senderID) &&
            conv.members.includes(newConversation.receiverId) 
        })

        if(!exists){
            setConversations([...conversations,newConversation])
        }
        console.log(conversations);
    }

    return(
        <AccountContext.Provider value ={{
            account,
            setAccount,
            person,
            setPerson,
            conversations,
            setConversation,
            users,
            setUsers,
            messageList,
            setMessagesList

        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;