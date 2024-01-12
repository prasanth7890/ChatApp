import {
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

const GroupChatModal = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatname, setGroupChatName] = useState(""); // groupchat name
  const [selectedUsers, setSelectedUsers] = useState([]); // users selected for new group chat
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
      console.log(data);
      setLoading(false);
      setSearchResult(data);

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

  const handleSubmit = () => {}

  const sayHello = () => {
    console.log('say hello');
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
            //TODO
            {/* selected users  */}
            {loading ? <div>loading</div>: (
              searchResult?.slice(0,4).map((user)=> (
                <UserListItem key={user._id} user={user} handleFunction={sayHello} />
              ))
            ) }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
