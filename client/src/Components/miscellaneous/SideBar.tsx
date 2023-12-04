import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Toast, Tooltip, useToast } from '@chakra-ui/react';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import ChatLoading from '../ChatLoading';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const SideBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChats] = useState(false);
  const user = useSelector((state:any)=>state.user.value);
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  }

  const handleSearch = async() => {
    if(!search) {
      toast({
        title: "Please enter something to search",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return ;
    }

    try {
      setLoading(true);
      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`http://localhost:4000/?search=${search}`, config);
      
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      toast({
        title: "Error Occured",
        description: 'Failed to load the Search Result',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
      return ;
    }
  }


  const accessChat = async (userId: string) => {
      try {
        setLoadingChats(true);

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        const {data} = await axios.post('/chats', {userId}, config);
        // TODO: selectedChat state is not existed, make it available in redux store so whole can access.
        setSelectedChat(data);
        setLoadingChats(false);
        onClose();

      } catch(error)
      {
        toast({
          title: "Error Occured",
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
  }



  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        background={'white'}
        width={'100%'}
        padding={'5px 20px 5px 20px'}
        borderWidth={'5px'}
      >
        <Tooltip label={'Search Users to Chat'} hasArrow placement='bottom-end'>
          <Button variant={'ghost'} onClick={onOpen}>
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            <Text
              display={{base: "none", md:"flex"}}
              px={'4'}
              paddingLeft={'9px'}
            >Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize={'21'} marginRight={'40px'} fontFamily={'Josefin Sans'}>
          ChatApp Title 
        </Text>

        <div style={{display: 'flex', justifyContent: "space-between"}}>
          <Menu>
            <MenuButton p={1}>
            <i className="fa-regular fa-bell" style={{color: 'black', fontSize:'20px'}}></i>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<i className="fa-solid fa-chevron-down"></i>} style={{backgroundColor: "white"}}>
              <Avatar size={'sm'} cursor={'pointer'} name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={logoutHandler}>LogOut</MenuItem>

            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={'flex'} pb={2}>
              <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)}/>
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
                <ChatLoading></ChatLoading>
            ): (
              searchResult?.map(userItem => (
                <UserListItem
                  key={userItem._id}
                  user={userItem}
                  handleFunction={() => accessChat(userItem._id)}
                />
              ))
            )}
          </DrawerBody>
          </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideBar;
