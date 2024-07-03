import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Flex,
  Stack,
  useColorModeValue,
  Image,
  Link,
  textDecoration,
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
// import contactImage from ".../static/images/contact.png";

export type ContactType = NonNullable<IndexPageFrontmatterType>["contact"];

export default function Contact(props: ContactType) {
  return (
    <Container
      id="contact"
      maxW={"9xl"}
      overflow="hidden"
      display={"flex"}
      justifyContent={"center"}
      as="section"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      
      
          <Flex  maxW={"6xl"} direction={{sm : "column-reverse" , md : "row", lg : "row"}} gap={"3rem"}>
            {/* left box */}

            <Box
              w={"32rem"}
              
              boxShadow="md"
              m={"1rem auto 3rem auto"}
              p="1rem"
              rounded="md"
              bg={useColorModeValue("white", "gray.600")}
              borderRadius="lg"
            >
               <Box w={"32rem"}
               bg={"yellow"}
                mb={4}
                textAlign={"center"}
                mt={0}>
              <Text
                
                fontSize={22}
                fontWeight={600}
                // bg={"red"}
                as={"span"}
                color={useColorModeValue("red.400", "red.500")}
                textAlign={"center"}
              >
                Fill the form to contact us
              </Text>
              </Box>
              <form
                name="contact"
                method="post"
                data-netlify-honeypot="bot-field"
                data-netlify="true"
                
              >
                <Box w={"32rem"}>
                  <SimpleGrid columns={{ sm: 1, md: 1 }} spacing="1rem">
                    <input type="hidden" name="form-name" value="contact" />
                    <FormControl id="name" isRequired>
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <BsPerson color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" name="name" size="md"  w={"26rem"} />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="email" isRequired>
                      <FormLabel>Mail</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <MdOutlineEmail color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" name="email" size="md" w={"26rem"}/>
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>
                </Box>

                <FormControl id="Subject" margin={"1rem 0rem"} isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    type="text"
                    name="subject"
                    size="md"
                    placeholder="Subject"
                  />
                </FormControl>
                <FormControl id="message" margin={"1rem 0rem"} isRequired>
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
                <FormControl id="name">
                  <Flex justifyContent={"center"}>
                    <Button
                     
                      w={"100%"}
                      type="submit"
                      variant="solid"
                      bg="red.400"
                      textAlign={"center"}
                      color="white"
                      _hover={{
                        background : "red.500"
                      }}
                    >
                      Send Message
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Box>
            <Box w={"42rem"} >
              {/*  rigth box */}
              <Box justifySelf={"center"} margin={"2px auto"} w={"42rem"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
                  textAlign={"center"}
                >
                  <Text
                    as={"span"}
                    position={"relative"}
                    zIndex={1}
                    _after={{
                      content: "''",
                      width: "full",
                      height: "30%",
                      position: "absolute",
                      bottom: 2,
                      left: 0,
                      bg: "red.400",
                      zIndex: -1,
                    }}
                  >
                    Contact us
                  </Text>
                </Heading>
                <Link
                 href={"mailto:" + props?.email}
                 isExternal
                 _hover={{
                  textDecoration: "none",
                }}
  
                >
                <Text
                  mt={{ sm: 3, md: 3, lg: 5 }}
                  color={useColorModeValue("gray.600", "gray.400")}
                  textAlign={"center"}
                  fontWeight={500}
                  fontSize={24}
                >
                  Drop us a mail{" "}
                  <Text as={"span"} color={"red.400"}>
                    contact@appweave.tech
                  </Text>
                </Text>
                </Link>
                
              </Box>
              <Box
                position={"relative"}
                top={20}
                margin={"0rem auto"}
                height={"24rem"}
                rounded={"2xl"}
                
                width={{sm:"lg",md:"full",lg:"full"}}
                overflow={"hidden"}
              >
                <Image
                  alt={"contact image"}
                  fit={"contain"}
                  align={"center"}
                  w={"98%"}
                  h={"98%"}
                  src= {props?.contactImage}
                />
              </Box>
            </Box>
          </Flex>
    </Container>
  );
}
