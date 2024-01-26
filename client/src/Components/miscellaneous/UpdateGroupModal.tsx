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
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Button } from "@chakra-ui/react";
import { setSelectedChat } from "../../Features/selectedchats";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserBadge from "../UserAvatar/UserBadge";

const UpdateGroupModal = (props: {
  fetchAgain: boolean;
  setfetchAgain: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupchatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const user = useSelector((state: any) => state.user.value);
  const selectedchat = useSelector(
    (state: any) => state.selectedChat.selectedChat
  );
  const dispatch = useDispatch();

  const handleRemove = (user: any) => {};

  const handleRename = () => {};

  const handleSearch = () => {
    
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
                value={groupchatName}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
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

export default UpdateGroupModal;
