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
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShow] = useState(false);

  const handleClick=async()=>{
    try{
    const data = await axios.post(
        "http://localhost:5000/security/login/",
        {
          email: email,
          password: password,
         
        },
        { withCredentials: true } //important if want to save cookie in browser
      );
        console.log(data)
      if(data.data.message==="success"){
       navigate("/AddBoard");
      }
      }catch(err){
        console.log(err);
        setEmail("")
        setPassword("")
      }
  }
  return (
    <VStack spacing="5px">
      <FormControl isRequired id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              height="1.75rem"
              onClick={() => {
                setShow(!showPassword);
              }}
            >
              {showPassword ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button width="100%" style={{ marginTop: 15 }} onClick={handleClick}>
        Login
      </Button>
    </VStack>
  );
};
