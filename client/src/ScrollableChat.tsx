import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "./ts/chatLogic";
import { useSelector } from "react-redux";
import { Avatar, Tooltip } from "@chakra-ui/react";

interface Props {
  messages: any;
}

const ScrollableChat = ({ messages }: Props) => {
  const user = useSelector((state: any) => state.user.value);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m: any, i: any) => {
          return (
            <div key={m._id} style={{ display: "flex" }}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt={"7px"}
                    mr={1}
                    size={"sm"}
                    cursor={"pointer"}
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              )}
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
