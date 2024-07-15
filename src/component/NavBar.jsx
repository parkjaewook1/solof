import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export function NavBar() {
  const navigate = useNavigate();
  return (
    <Flex gap={3}>
      <Box
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        HOME
      </Box>
      <Box
        onClick={() => navigate("/boardWrite")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        글쓰기
      </Box>
    </Flex>
  );
}
