import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(false);


  const submitHandler = async() => {
    setLoading(true);
    if(!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "error",
        variant: "subtle",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        colorScheme: "red",
      });
      setLoading(false);
      return;
    }

    const Data = new FormData();
    Data.append('email', email);
    Data.append('password', password);
    console.log(email, password);
    
    try {
      const {data} = await axios.post('http://localhost:4000/login',{
        "email": email,
        "password": password,
      });
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      navigate('/chats');
    
    } catch(error: any) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>

          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button 
        colorScheme='blue'
        variant={'solid'}
        width={'100%'}
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button 
        colorScheme='red'
        variant={'solid'}
        width={'100%'}
        onClick={()=>{
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login;
