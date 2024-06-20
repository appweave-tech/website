import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
 
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import React from "react";
import { IndexPageFrontmatterType } from "../pages";

export type ContactType = NonNullable<IndexPageFrontmatterType>["contact"];

export default function Contact(props: ContactType) {

  return (
    <Container
      id="contact"
      maxW={'6xl'}
      mt={0}
      centerContent
      overflow="hidden"
      as="section"
      bgColor={"#edf2f7"}
    >
                <Box bgColor={"#edf2f7"} justifySelf={"center"} margin={"2px 4em"} w={"100%"}>
                  <Heading textAlign={"center"} >
                   Contact us</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500" textAlign={"center"}>
                    Fill up the form below to contact
                  </Text>
                </Box>

                <Box py={{ base: 5, lg: 10 }} w={"100%"} bg={"#edf2f7"}>
                <center>
                    <SimpleGrid   minChildWidth='320px' spacing='40px' >
                      <Box bg={"#edf2f7"}>
                       
                      <Link display={'fled'} gap={'8px'} alignItems={'center'} w={"14rem"}>
                        <VStack>
                        <MdLocationOn color="#68d391" size="100px" />
                         <Text mt={{ sm: 3, md: 3, lg: 5}} color="gray.500">
                        Address
                         </Text>
                          <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500" textAlign={"center"}>
                             {props?.address}
                          </Text>
                        </VStack>
                      </Link>
                      </Box>
                    
                      <Box bg={"#edf2f7"} >
                        <Link href={"tel:" + props?.phoneNumber}  display={'fled'}  gap={'8px'} alignItems={'center'} w={"10rem"}>
                    
                        <VStack >
                        
                        <MdPhone color="#68d391" size="100px"  />
                        <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500" textAlign={"center"}>
                        PHONE NUMBER
                       </Text>
                       <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500" textAlign={"center"}>{props?.phoneNumber}</Text>
                        </VStack>
                      </Link>
                      </Box>
                      
                      <Box bg={"#edf2f7"}><Link href={"mailto:" + props?.email} isExternal display={'fled'} gap={'8px'} alignItems={'center'} w={"10rem"} >
                        <VStack>
                           <MdEmail color="#68d391" size="100px" />
                           <Text mt={{ sm: 3, md: 3, lg: 5 }}  color="gray.500">
                           EMAIL</Text>
                           <Text mt={{ sm: 3, md: 3, lg: 5 }} >{props?.email}</Text>
                          
                        </VStack>
                      </Link>
                    
                      </Box>
                      

                      
                    </SimpleGrid>
                    </center>
                    </Box>
             
                  
               
                <Box boxShadow='md' p='6' rounded='md' bg='white'  borderRadius="lg"  w={"100%"} margin={"5px 0px"}>
                 
                      <form name="contact" method="post" data-netlify-honeypot="bot-field" data-netlify="true">
                      <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}w={"100%"} >
                      <SimpleGrid  minChildWidth='120px' spacing='40px'>
                        <input type="hidden" name="form-name" value="contact"/>
                       
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <BsPerson color="gray.800" />
                            </InputLeftElement>
                            <Input type="text" name="name" size="md" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="email">
                          <FormLabel>Mail</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <MdOutlineEmail color="gray.800" />
                            </InputLeftElement>
                            <Input type="text" name="email" size="md" />
                          </InputGroup>
                        </FormControl>
                        </SimpleGrid>
                        </Box>
                       
                        <FormControl id="Subject">
                          <FormLabel>Subject</FormLabel>
                          <Input type="text" name="subject" size="md"   placeholder="Subject" />
                        </FormControl>
                        <FormControl id="message">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "gray.300",
                            }}
                            name="message"
                            placeholder="message"
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <center >
                          <Button 
                            margin={"4rem"}
                            type="submit"
                            variant="solid"
                            bg="#68d391"
                            color="white"
                            _hover={{}}
                          >
                            Send Message
                          </Button>
                          </center>
                         
                        </FormControl>
                      </form>
                </Box>
    </Container>
  );
}
{/* <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="sm"
                      isRound={true}
                      bg={'#fff'}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<MdFacebook size="16px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="sm"
                      isRound={true}
                      bg={'#fff'}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsGithub size="16px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="sm"
                      isRound={true}
                      bg={'#fff'}
                      _hover={{ bg: "#0D74FF" }}
                      icon={<BsDiscord size="16px" />}
                    />
                  </HStack> */}