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

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [avater, setAvater] = useState("");
  const [avaterUrl, setAvaterUrl] = useState("");

  const [showPassword, setShow] = useState(false);

  const submitHandler = async () => {
  try{
   if (avater !== ""&&password===confirmPassword) {
        //uploading image
        const formData = new FormData();
        formData.append("file",avater);
        formData.append("upload_preset", "tdgzjxy8");

        const cloudResp = await axios.post(
          "https://api.cloudinary.com/v1_1/dloccscas/image/upload",
          formData
        );
        setAvaterUrl(cloudResp.data.secure_url);        
      }

    const data = await axios.post(
        "http://localhost:5000/security/signup",
        {
          email: email,
          password: password,
          fname:name,
          img:avaterUrl
         
        },
        { withCredentials: true } //important if want to save cookie in browser
      );

      if(data.data.message==="success"){
       navigate("/AddBoard");
      }
      }catch(err){
        console.log(err);
        setEmail("")
        setPassword("")
      }
    
  };
  return (
    <VStack spacing="5px">
      <FormControl isRequired id="first-name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
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
      <FormControl isRequired id="confrim-password">
        <FormLabel>Confrim Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password Again"
            onChange={(e) => {
              setconfirmPassword(e.target.value);
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
      <FormControl isRequired id="avater-pic">
        <FormLabel>Upload Pic</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            setAvater(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button width="100%" style={{ marginTop: 20 }} onClick={()=>{submitHandler()}}>
        Sign Up
      </Button>
    </VStack>
  );
};
