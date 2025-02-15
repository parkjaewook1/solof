import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleClickPass() {
    setIsLoading(true);
    axios
      .post("/api/member/signup", { email, password, nickName })
      .then((res) => {
        toast({
          status: "success",
          description: "회원 가입 완료!",
          position: "top",
        });
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "입력값을 확인해 주세요.",
            position: "top",
          });
        } else {
          toast({
            status: "error",
            description: "회원 가입 중 문제가 발생하였습니다.",
            position: "top",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다.",
          position: "top",
        });
      }) //이미 있는 이메일(사용 못함)
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다.",
            position: "top",
          });
          setIsCheckedEmail(true);
        }
      })
      .finally();
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 닉네임입니다.",
          position: "top",
        });
      }) //이미 있는 이메일(사용 못함)
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 닉네임입니다.",
            position: "top",
          });
          setIsCheckedNickName(true);
        }
      })
      .finally();
  }

  const isCheckedPassword = password === passwordCheck;

  let isDisabled = false;

  if (!isCheckedPassword) {
    isDisabled = true;
  }

  if (
    !(
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      nickName.trim().length > 0
    )
  ) {
    isDisabled = true;
  }

  if (!isCheckedEmail) {
    isDisabled = true;
  }

  if (!isCheckedNickName) {
    isDisabled = true;
  }

  if (!isValidEmail) {
    isDisabled = true;
  }

  return (
    <Box>
      <Box>회원 가입</Box>{" "}
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <InputGroup>
              <Input
                type={"email"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsCheckedEmail(false);
                  setIsValidEmail(!e.target.validity.typeMismatch);
                }}
              />
              <InputRightElement w={"75px"} mr={1}>
                <Button
                  isDisabled={!isValidEmail || email.trim().length == 0}
                  onClick={handleCheckEmail}
                  size={"sm"}
                >
                  중복 확인
                </Button>
              </InputRightElement>
            </InputGroup>
            {isCheckedEmail || (
              <FormHelperText>이메일 중복확인을 해주세요.</FormHelperText>
            )}
            {isValidEmail || (
              <FormHelperText>
                올바른 이메일 형식으로 작성해 주세요.
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호 확인</FormLabel>
            <Input onChange={(e) => setPasswordCheck(e.target.value)} />
            {isCheckedPassword || (
              <FormHelperText>암호가 일치하지 않습니다.</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <InputGroup>
              <Input
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value.trim());
                  setIsCheckedNickName(false);
                }}
              />
              <InputRightElement w={"75px"} mr={1}>
                <Button
                  isDisabled={nickName.trim().length == 0}
                  size={"sm"}
                  onClick={handleCheckNickName}
                >
                  중복 확인
                </Button>
              </InputRightElement>
            </InputGroup>
            {isCheckedNickName || (
              <FormHelperText>닉네임 중복확인을 해주세요.</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <Button
            isLoading={isLoading}
            colorScheme={"blue"}
            onClick={handleClickPass}
            isDisabled={isDisabled}
          >
            가입
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
