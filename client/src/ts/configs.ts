export type userType =  {
    _id: string,
    name: string,
    email: string,
    pic: string,
    token?: string,
};

export type ChatsType = {
    _id: string,
    chatName: string,
    createdAt: string,
    isGroupChat: false,
    updatedAt: string,
    users: [userType],
}