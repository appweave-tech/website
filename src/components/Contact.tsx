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
      maxW={"100%"}
      mt={0}
      overflow="hidden"
      as="section"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      
      
          <Flex w={"100%"} justifyContent={"space-between"}>
            {/* left box */}

            <Box
              w={"40%"}
              boxShadow="md"
              m={"0px auto 3rem auto"}
              p="6"
              rounded="md"
              bg={useColorModeValue("white", "gray.600")}
              borderRadius="lg"
            >
              <Text
                w={"100%"}
                mb={{ sm: 3, md: 3, lg: 5 }}
                fontSize={20}
                fontWeight={600}
                as={"span"}
                color={useColorModeValue("red.400", "red.500")}
                textAlign={"center"}
              >
                Fill the form to contact us
              </Text>

              <form
                name="contact"
                method="post"
                data-netlify-honeypot="bot-field"
                data-netlify="true"
              >
                <Box w={"100%"}>
                  <SimpleGrid columns={{ sm: 1, md: 1 }} spacing="30px">
                    <input type="hidden" name="form-name" value="contact" />
                    <FormControl id="name" isRequired>
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement pointerEvents="none">
                          <BsPerson color="gray.800" />
                        </InputLeftElement>
                        <Input type="text" name="name" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="email" isRequired>
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

                <FormControl id="Subject" margin={"30px 0px"} isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    type="text"
                    name="subject"
                    size="md"
                    placeholder="Subject"
                  />
                </FormControl>
                <FormControl id="message" margin={"30px 0px"} isRequired>
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
                      // margin={"40px"}
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
            <Box w={"50%"}>
              {/*  rigth box */}
              <Box justifySelf={"center"} margin={"2px auto"} w={"100%"}>
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
                top={28}
                height={"300px"}
                rounded={"2xl"}
                width={"full"}
                overflow={"hidden"}
              >
                <Image
                  alt={"contact img"}
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
