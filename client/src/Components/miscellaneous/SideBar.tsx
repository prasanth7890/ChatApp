import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

const SideBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChats] = useState();
  const user = useSelector((state:any)=>state.user.value);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
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
          <Button variant={'ghost'} >
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
              <ProfileModal user={user} >
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={logoutHandler}>LogOut</MenuItem>

            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default SideBar;
