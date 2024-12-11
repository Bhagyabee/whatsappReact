import conversationData from '../constants/messages.json';
import users from '../constants/users.json'
export const addUser = async (data)=>{


}


export const getUsers = async ({page,pageSize})=>{
  
  try{
    const TotalUsers = users.length;
    const startIndex  = (page-1)*pageSize;
    const endIndex = page*pageSize-1;
    console.log(
      `Fetching users: Page ${page}, Start ${startIndex}, End ${endIndex}, Total ${TotalUsers}` // Debugging line
    );

    const paginatedMessages = users.slice(startIndex, endIndex);

      console.log("Paginated users:", paginatedMessages); // Debugging line

      return {
       
        users: paginatedMessages,
        hasMore: endIndex < TotalUsers // Indicates if there are more messages to load
      };


  }catch(error){
    console.error("Error fetching users:", error);
    throw error;
  }

}

export const getConversation = async ({ senderId, receiverId, page, pageSize }) => {
  try {
    // Find the relevant conversation based on sender and receiver IDs
    const conversation = conversationData.conversations.find(
      (conv) => conv.members.includes(senderId) && conv.members.includes(receiverId)
    );

    if (conversation) {
      const totalMessages = conversation.messages.length; // Total number of messages
      const startIndex = Math.max(totalMessages - page * pageSize, 0); // Calculate starting index for the current page
      const endIndex = totalMessages - (page - 1) * pageSize; // Calculate ending index

      console.log(
        `Fetching messages: Page ${page}, Start ${startIndex}, End ${endIndex}, Total ${totalMessages}` // Debugging line
      );

      // Slice messages for the requested page
      const paginatedMessages = conversation.messages.slice(startIndex, endIndex);

      console.log("Paginated Messages:", paginatedMessages); // Debugging line

      return {
        ...conversation,
        messages: paginatedMessages,
        hasMore: startIndex > 0, // Indicates if there are more messages to load
      };
    } else {
      throw new Error("Conversation not found");
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

  