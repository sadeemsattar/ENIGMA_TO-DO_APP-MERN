import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
export function Feature({ id,title, desc, arrayTask, ...rest }) {
  const el = useRef(null);
  const [cardTitle, setTitle] = useState();
  const [description, setDescription] = useState();
  const [member, setMember] = useState();
  const [label, setLabel] = useState();

  const dragStart = (e) => {
    e.dataTransfer.setData("Text", e.target.id);
    // console.log("start", e);
  };
  const drop = (e) => {
   
    // console.log("drop", e, "---", e.dataTransfer.getData("Text"));
    var data = e.dataTransfer.getData("Text");
    console.log("From",data[0],"to",e.target.id)
    // childs id
    const idd = document.getElementById(data);
    let oldid=idd.id;
    // oldid.replace(0,e.target.id);
    oldid=e.target.id+oldid.substring(1)
   idd.id=oldid
    // idd.setAttribute("id",oldid)
    // idd.id=btoa(oldid)
    // idd.id=
    console.log(idd.id,e.target.chil)
    e.target.appendChild(idd);
  };
  const allowDrop = (e) => {
    e.preventDefault();
    // console.log("allow", e);
  };

  return (
    <Box
      p={5}
      borderWidth="1px"
      flex="1"
      shadow="md"
      width="100%"
      borderRadius="md"
      m={".5rem"}
      {...rest}
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
      <Box display={"flex"}>
        <Grid w="100%" display={"flex"} flexDirection="column">
          <GridItem
          id={id}
            h="10"
            bg="blue.500"
            onDrop={(e) => {
              drop(e);
            }}
            onDragOver={(e) => {
              allowDrop(e);
            }}
          ></GridItem>

          <GridItem bg="green" display={"flex"} flexWrap="wrap">
            {arrayTask.map((item, key) => {
              return (
                <Button m={2}
                  id={`${id}${item.item}`}
                  ref={el}
                  onDragStart={(e) => {
                    dragStart(e);
                  }}
                  draggable="true"
                >
                  {item.description}
                </Button>
              );
            })}
          </GridItem>
          <GridItem>
            <Popover>
              <PopoverTrigger>
                <Button width={"100%"} leftIcon="+"> Add Card</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Add Card</PopoverHeader>
                <PopoverBody>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    width={"100%"}
                  >
                    <VStack spacing="5px" width="100%">
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
                      <FormControl>
                        <FormLabel htmlFor="AddMember">AddMember</FormLabel>
                        <Select id="AddMember" placeholder="Select AddMember">
                          <option>United Arab Emirates</option>
                          <option>Nigeria</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="SelectLabel">SelectLabel</FormLabel>
                        <Select id="SelectLabel" placeholder="Select Label">
                          <option>United Arab Emirates</option>
                          <option>Nigeria</option>
                        </Select>
                      </FormControl>

                      <Button width="100%" style={{ marginTop: 15 }}>
                        Add Card
                      </Button>
                    </VStack>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
