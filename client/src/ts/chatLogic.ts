import { userType } from "./configs";

export const getSender = (loggedUser: userType, users: any) => {
  if (users && users[1]) {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  }
};

export const getSenderFull = (loggedUser: userType, users: any) => {
  if (users && users[1]) {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  }
};

export const isSameSender = (messages:any, m:any, i:any, userId:any) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};


export const isLastMessage = (messages:any, i:any, userId:any) => {
    return(
        i === messages.length - 1 && 
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    )
}