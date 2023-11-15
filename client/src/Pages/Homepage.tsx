import React from 'react';
import {Box, Container, Text, Tabs, TabList, TabPanel, TabPanels, Tab} from '@chakra-ui/react';
import Login from "../Components/Authentication/Login";
import SignUp from "../Components/Authentication/SignUp";

const Homepage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"10px"}
        borderWidth={"1px"}
      >
        <Text fontSize={"3xl"} fontFamily={"Agbalumo"} color={"black"}>
          Chat-App
        </Text>
      </Box>
      <Box bg={"white"} w={"100%"} p={"4"} borderWidth={"1px"} color={'black'}>
        <Tabs variant="soft-rounded" colorScheme='teal'>
          <TabList mb={'1em'}>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage
