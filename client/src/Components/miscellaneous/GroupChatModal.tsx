import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChats } from "../../Features/chats";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadge from "../UserAvatar/UserBadge";
import { getTokenSourceMapRange, idText } from "typescript";

const GroupChatModal = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatname, setGroupChatName] = useState<string>(); // groupchat name
  const [selectedUsers, setSelectedUsers] = useState<any>([]); // users selected for new group chat
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]); //for search results
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  
  const user = useSelector((state:any) => state.user.value);
  const chats = useSelector((state:any) => state.chats);
  const dispatch = useDispatch();

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

  const handleSubmit = async () => {
    if(!groupChatname || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: 'top'
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post('http://localhost:4000/chats/group', {
        name: groupChatname,
        users: JSON.stringify(selectedUsers.map((u:any)=>u._id))
      }, config);

      dispatch(setChats([data, ...chats]));
      onClose();
      toast({
        title: "New Group Chat is Created!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: 'bottom'
      });

    } catch (error:any) {
      toast({
        title: "Failed to create the Chat",
        status: error.response.data,
        duration: 4000,
        isClosable: true,
        position: 'bottom'
      });
    }


  }

  const handleGroup = (userToAdd: any) => {
    if(selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  }

  const handleDelete = (userToDelete:any) => {
    setSelectedUsers(selectedUsers.filter((sel:any) => sel._id !== userToDelete._id));
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={'20px'}
            fontWeight={''}
            fontFamily={"Josefin Sans"}
            display={'flex'}
            justifyContent={'center'}
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDir={'column'} alignItems={'center'}>
           <FormControl>
              <Input placeholder="Chat Name" mb={3} onChange={(e)=>setGroupChatName(e.target.value)}/>
            </FormControl> 

            <FormControl>
              <Input placeholder="Add Users" mb={1} onChange={(e)=>handleSearch(e.target.value)}/>
            </FormControl> 
            <Box w={'100%'} display={'flex'} flexWrap={'wrap'}>
              {selectedUsers.map((u:any) => (
                <UserBadge key={user._id} user={u} handleFunction={()=>handleDelete(u)}/>
              ))}
            </Box>

            {loading ? <div>loading</div>: (
              searchResult?.slice(0,4).map((user:any)=> (
                <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)} />
              ))
            ) }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
