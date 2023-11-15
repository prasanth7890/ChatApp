import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import React from 'react'

const SignUp:React.FC = () => {
  return (
    <VStack spacing={'5px'}>
        <FormControl>
            <FormLabel></FormLabel>
            <Input placeholder='Enter Your Name'></Input>
        </FormControl>
    </VStack>
  )
}

export default SignUp;
