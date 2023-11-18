import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const SignUp: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const postDetails = (pics: any) => {
    setLoading(true);
    if (pics === undefined || (pics.type.toString().split('/')[0] !== 'image')) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setPicture(pics);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //   const data = new FormData();
    //   data.append("file", pics);
    //   data.append("upload_preset", "chat_app");
    //   data.append("cloud_name", "drrgatts5");
    
    //   fetch("https://api.cloudinary.com/v1_1/drrgatts5", {
    //     method: "post",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setPicture(data.url.toString());
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setLoading(false);
    //     });
    // } else {
    //   toast({
    //     title: "Please Select an Image",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    //   return;
    // }
  };

  const submitHandler = async() => {
    console.log(name, email, password, confirmpassword, picture);
    if(password !== confirmpassword) {
      toast({
        title: "Entered Passwords are not matching, Please Check Again",
        status: "error",
        variant: "subtle",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        colorScheme: "red",
      });
      return;
    }

    const Data = new FormData();
    Data.append('name', name);
    Data.append('email', email);
    Data.append('password', password);
    if(picture) {
      Data.append('picture', picture);
    }

    const {data} = await axios.post('http://localhost:4000/', Data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

    console.log(data);

  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
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

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>

          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="picture" isRequired>
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              postDetails(e.target.files[0]);
            }
          }}
        ></Input>
      </FormControl>
      
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
