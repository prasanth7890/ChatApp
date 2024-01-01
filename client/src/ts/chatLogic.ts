import { userType } from "./configs";

export const getSender = (loggedUser:userType, users:any) => {
    if(users) {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name; 
    }
}