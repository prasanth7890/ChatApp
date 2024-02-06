import "../App.css";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IconButton } from "@chakra-ui/button";
import { clearSelectedChat } from "../Features/selectedchats";
import { getSender, getSenderFull } from "../ts/chatLogic";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupModal from "./miscellaneous/UpdateGroupModal";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollableChat from "../ScrollableChat";

const SingleChat = (props: { fetchApi: boolean; setfetchApi: any }) => {
  const user = useSelector((state: any) => state.user.value);
  const selectedchat = useSelector(
    (state: any) => state.selectedChat.selectedChat
  );
  const dispatch = useDispatch();

  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");

  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedchat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:4000/message/${selectedchat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error Occured",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedchat]);

  const sendMessage = async (event: any) => {
    if (event.key == "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:4000/message",
          {
            content: newMessage,
            chatId: selectedchat._id,
          },
          config
        );

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
    //TODO: typing indicator logic here
  };

  return (
    <>
      {selectedchat._id ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              onClick={() => dispatch(clearSelectedChat())}
              aria-label="go back"
              display={{ base: "flex", md: "none" }}
              icon={<i className="fa-regular fa-hand-point-left"></i>}
            />
            {selectedchat.isGroupChat ? (
              // if groupchat
              <>
                <p style={{ fontSize: "25px" }}>
                  {selectedchat.chatName.toUpperCase()}
                </p>
                <UpdateGroupModal
                  fetchAgain={props.fetchApi}
                  setfetchAgain={props.setfetchApi}
                  fetchMessages={fetchMessages}
                ></UpdateGroupModal>
              </>
            ) : (
              <>
                <div style={{ fontSize: "25px" }}>
                  {getSender(user, selectedchat.users)}
                </div>
                <ProfileModal user={getSenderFull(user, selectedchat.users)} />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            bg={"greenyellow"}
            p={3}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflow={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"l"}
                w={10}
                h={10}
                margin={"auto"}
                alignSelf={"center"}
              />
            ) : (
              <div className="message">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage}>
              <Input
                variant={"filled"}
                bg={"#E0E0E0"}
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h="100%"
        >
          <Text fontSize={"xl"} pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
