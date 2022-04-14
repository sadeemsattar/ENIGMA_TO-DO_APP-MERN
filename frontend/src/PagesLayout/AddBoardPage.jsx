import {
  Container,
  Box,
  TabPanel,
  TabPanels,
  Tab,
  TabList,
  Tabs,
  Button,
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  DrawerHeader,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  Select,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Feature } from "../components/Feature";
import axios from "axios";
export const AddBoardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [cardShow, setCardShow] = useState(false);
  const [Board, setBoard] = useState();
    const [list, setList] = useState();

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/user/board",
      {
        withCredentials: true,
      }
    );
    setList(response.data.result);
  };

  const addBoard=async ()=>{
    try{
     const data = await axios.post(
        "http://localhost:5000/user/board",
        {
          title, description 
         
        },
        { withCredentials: true } //important if want to save cookie in browser
      );

      if(data.data.message==="success"){
        getData();
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{getData()},[])
  const todo = [
    { item: 1, description: "add ui/ux of screen" },
    { item: 2, description: "create database of users" },
    { item: 3, description: "make the api of backend" },
  ];
  const progress = [
    { item: 1, description: "Tenants dashboard users" },
    { item: 2, description: "Tenants tABLE SCHEME" },
    { item: 3, description: "User backend updation" },
  ];
  const codeReview = [
    { item: 1, description: "Rejection list users" },
    { item: 2, description: "make the api of backend" },
    { item: 3, description: "add ui/ux of screen" },
  ];
  const done = [
    { item: 1, description: "Tenants dashboard users" },
    { item: 2, description: "create database of users" },
    { item: 3, description: "add ui/ux of screen" },
   
  ];
  return (
    <Container maxW="100%" marginTop="15px">
      <Box bg="#061727" w="100%" borderRadius="lg" p={3}>
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab onClick={onOpen}>Dash Board</Tab>
            <Tab
              onClick={(e) => {
                if (cardShow == true) setCardShow(false);
              }}
            >
              Add Board
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {cardShow ? (
                <Box
                  d="flex"
                  justifyContent={"space-around"}
                  flexDirection={"column"}
                >
                  <Box d="flex" justifyContent={"space-between"} m={".5rem"}>
                    <Box display={"flex"}>
                      <Box>
                        <Popover>
                          <PopoverTrigger>
                            <Button width={"100%"}>Invite</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Invite Member</PopoverHeader>
                            <PopoverBody>
                              <Box
                                display={"flex"}
                                justifyContent={"center"}
                                width={"100%"}
                              >
                                <VStack spacing="5px" width="100%">
                                  <FormLabel htmlFor="InviteMember">
                                    Invite Member
                                  </FormLabel>
                                  <Select
                                    id="InviteMember"
                                    placeholder="Select InviteMember"
                                  >
                                    <option>United Arab Emirates</option>
                                    <option>Nigeria</option>
                                  </Select>
                                  <Button
                                    width="100%"
                                    style={{ marginTop: 15 }}
                                  >
                                    Add Invite
                                  </Button>
                                </VStack>
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                      <Box m={".2rem"}>
                        <Image
                          borderRadius="full"
                          boxSize="35px"
                          src="https://bit.ly/dan-abramov"
                          alt="Dan Abramov"
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Input placeholder="Search"></Input>
                    </Box>
                  </Box>
                  <Box d="flex">
                    <Feature
                    id="1"
                      title="To Do"
                      desc="The future can be even brighter but a goal without a plan is just a wish"
                      arrayTask={todo}
                    />
                    <Feature
                    id="2"
                      title="Progress"
                      desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings."
                      arrayTask={progress}
                    />
                  </Box>
                  <Box d="flex">
                    <Feature
                    id="3"
                      title="Code Review"
                      desc="The future can be even brighter but a goal without a plan is just a wish"
                      arrayTask={codeReview}
                    />
                    <Feature
                      id="4"
                      title="Done"
                      desc="The future can be even brighter but a goal without a plan is just a wish"
                      arrayTask={done}
                    />
                  </Box>
                </Box>
              ) : (
                ""
              )}
              <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">My Board</DrawerHeader>
                  <DrawerBody>
                    <VStack>
                      
                    {list?.map((item)=>{
                      return <Button
                        width="100%"
                        
                        onClick={(e) => {
                          setBoard(item.BID);
                          setCardShow(true);
                        }}
                      >
                       {item.TITLE}
                      </Button>
                    })}
                     
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </TabPanel>
            <TabPanel>
              <Box justifyContent="center" p={3} d="flex">
                <VStack spacing="5px" width="50%">
                  <FormControl isRequired id="title">
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="Enter Title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl isRequired id="description">
                    <FormLabel>Description</FormLabel>
                    <Input
                      height="100px"
                      placeholder="Enter Title"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </FormControl>

                  <Button width="100%" style={{ marginTop: 15 }} onClick={()=>{
                    addBoard()
                  }}>
                    Add Board
                  </Button>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
