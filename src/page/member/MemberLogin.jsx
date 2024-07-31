import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberLogin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleLogin() {
    axios
      .post("/api/member/token", { email: email, password: password })
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Box>로그인</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"} onClick={handleLogin}>
            로그인
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
