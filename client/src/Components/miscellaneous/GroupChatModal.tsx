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

  const handleSearch = (e) => {
    
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
            {/* render searched users  */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
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
