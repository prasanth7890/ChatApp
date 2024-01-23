import { Box } from "@chakra-ui/react";

type props = {
    user: any,
    handleFunction: (user: any)=>void
}

const UserBadge = ({user, handleFunction}: props) => {
  return (
    <Box
        px={2}
        py={1}
        borderRadius={'lg'}
        m={1}
        mb={2}
        color={"white"}
        fontSize={13}
        bgColor={'purple'}
        cursor={'pointer'}
        onClick={handleFunction}
    >
      {user.name}
      <i className="fa-solid fa-xmark" style={{paddingLeft: '3px'}} onClick={()=>handleFunction(user)}></i>
    </Box>
  )
}

export default UserBadge
