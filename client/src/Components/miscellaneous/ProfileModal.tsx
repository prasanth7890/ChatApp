import React from 'react';
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { userType } from '../../ts/configs';

interface profileModalProps {
    user: userType,
    children?: any,
}

const ProfileModal:React.FC<profileModalProps> = ({user, children}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <div>
      {children ? <span onClick={onOpen}>{children}</span> : <span>Hi😁</span>}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"30px"}
            display={"flex"}
            justifyContent={"center"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDir={'column'} justifyContent={'space-between'} alignItems={'center'}>
            <Image
              borderRadius={"full"}
              boxSize={"110px"}
              src={user.pic}
              alt={user.name}
            />
            <Text
                fontSize={{base: "20px", md: "26px"}}
            >Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter display={'flex'} justifyContent={'center'}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProfileModal;
