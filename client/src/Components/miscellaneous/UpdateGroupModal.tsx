import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Button } from "@chakra-ui/react";
import { clearSelectedChat, setSelectedChat } from "../../Features/selectedchats";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserBadge from "../UserAvatar/UserBadge";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import { userType } from "../../ts/configs";

const UpdateGroupModal = (props: {
  fetchAgain: boolean,
  setfetchAgain: any,
  fetchMessages: any,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupchatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const user = useSelector((state: any) => state.user.value);
  const selectedchat = useSelector(
    (state: any) => state.selectedChat.selectedChat
  );
  const dispatch = useDispatch();

  const handleRemove = async (user1: userType) => {
      if(selectedchat.groupAdmin._id !== user._id && user1._id !== user._id) {
        toast({
          title: 'Only admins can remove someone!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        }

        const { data } = await axios.put(
          "http://localhost:4000/chats/groupremove",
          {
            chatId: selectedchat._id,
            userId: user1._id,
          },
          config
        );

        user1._id === user._id ? dispatch(clearSelectedChat()) : dispatch(setSelectedChat(data));
        props.setfetchAgain(!props.fetchAgain);
        props.fetchMessages();
        setLoading(false);
      } catch (error) {
        
      }
  };

  const handleAddUser = async (user1: userType) => {
    if(selectedchat.users.find((u:userType) => u._id === user1._id)) {
      toast({
        title: "User Already in Group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }

    if(selectedchat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }

      const { data } = await axios.put(
        "http://localhost:4000/chats/groupadd",
        {
          chatId: selectedchat._id,
          userId: user1._id,
        },
        config
      );

      dispatch(setSelectedChat(data));
      props.setfetchAgain(!props.fetchAgain);
      setLoading(false);
    }
    catch (error) {
      
    }
      
  }

  const handleRename = async () => {
    if(!groupchatName) return;

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }

      const { data } = await axios.put(
        "http://localhost:4000/chats/rename",
        {
          chatId: selectedchat._id,
          chatName: groupchatName,
        },
        config
      );

      dispatch(setSelectedChat(data));
      props.setfetchAgain(!props.fetchAgain);
      setRenameLoading(false);
    } catch (error:any) {
      toast({
        title: "Error Occured!",
        description: error.message.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if(!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`http://localhost:4000/?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);

    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
    
  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="eye button"
        display={{ base: "flex" }}
        icon={<i className="fa-regular fa-eye"></i>}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"25px"}
            display={"flex"}
            justifyContent={"center"}
          >
            {selectedchat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb="3">
              {selectedchat.users.map((u: any) => (
                <UserBadge
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupchatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                colorScheme={"teal"}
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl display={"flex"}>
              <Input
                placeholder="Add User to group"
                mb={1}
                // value={groupchatName}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <div>
              {loading ? (
                <Spinner size={'lg'}/>
              ): (
                searchResult?.map((usr: userType)=> {
                  return <UserListItem 
                    key={usr._id}
                    user={usr}
                    handleFunction={() => handleAddUser(usr)}
                  />
                })
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={()=> handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupModal;
