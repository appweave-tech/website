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
      maxW={"100%"}
      // maxW='md'

      mt={0}
      centerContent
      overflow="hidden"
      as="section"
      bgColor={"#edf2f7"}
    >
      <Box
        bgColor={"#edf2f7"}
        justifySelf={"center"}
        margin={"2px 4em"}
        w={"100%"}
      >
        <Heading textAlign={"center"}>Contact us</Heading>
        <Text
          mt={{ sm: 3, md: 3, lg: 5 }}
          color="gray.500"
          textAlign={"center"}
        >
          Fill up the form below to contact
        </Text>
      </Box>

      <Box
        py={{ base: 5, lg: 10 }}
        w={"100%"}
        h={"300px"}
        bg={"#edf2f7"}
        display={"flex"}
        placeItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <SimpleGrid
          columns={{ sm: 1, md: 3 }}
          spacing={{ sm: "3rem", md: "2rem", lg: "6rem" }}
          bg={"#edf2f7"}
        >
         
            <Link
              display={"flex"}
              justifyContent={"center"}
              w={"16rem"}
              
            >
              <MdLocationOn color="#f56565" size="3rem"  />
            </Link>
            <Link
              href={"tel:" + props?.phoneNumber}
              display={"flex"}
              textStyle={"none"}
              justifyContent={"center"}
              w={"10rem"}
            >
              <MdPhone color="#f56565" size="3rem" />
            </Link>
            <Link
              href={"mailto:" + props?.email}
              isExternal
              display={"flex"}
              justifyContent={"center"}
              w={"10rem"}
            >
              <MdEmail color="#f56565" size="3rem" />
            </Link>
        </SimpleGrid>
        <SimpleGrid
          columns={{ sm: 1, md: 3 }}
          spacing={{ sm: "1rem", md: "2rem", lg: "6rem" }}
          bg={"#edf2f7"}
        >
         
            <Link
              display={"fled"}
              alignItems={"center"}
              w={"16rem"}
            >
              <VStack spacing={"0px"}>
               
                <Text
                  mt={{ sm: 3, md: 3, lg: 5 }}
                  color="gray.900"
                  fontWeight={"600"}
                  fontFamily={"var(--chakra-colors-chakra-body-text)"}
                  fontSize={"1rem"}
                  textStyle={"none"}
                >
                  ADDRESS
                </Text>
                <Text
                  mt={{ sm: 3, md: 3, lg: 5 }}
                  color="gray.500"
                  textAlign={"center"}
                  fontSize={"0.8rem"}
                >
                  {props?.address}
                </Text>
              </VStack>
            </Link>
         

          
            <Link
              href={"tel:" + props?.phoneNumber}
              display={"fled"}
              alignItems={"center"}

              w={"10rem"}
            >
              <VStack spacing={"4px"}>
                
                <Text color="gray.900" textAlign={"center"} fontWeight={"600"}>
                  PHONE NUMBER
                </Text>
                <Text color="gray.500" textAlign={"center"}>
                  {props?.phoneNumber}
                </Text>
              </VStack>
            </Link>
         

          
            <Link
              href={"mailto:" + props?.email}
              isExternal
              display={"fled"}
              alignItems={"center"}
              w={"10rem"}
            >
              <VStack spacing={"4px"}>
               
                <Text color="gray.900" fontWeight={"600"} textAlign={"center"}>
                  EMAIL
                </Text>
                <Text color="gray.900" textAlign={"center"}>
                  {props?.email}
                </Text>
              </VStack>
            </Link>
          
        </SimpleGrid>
      </Box>

      <Box
        boxShadow="md"
        p="6"
        rounded="md"
        bg="white"
        borderRadius="lg"
        w={{ sm: "96%", md: "64%" }}
        margin={"2rem 0px 4rem 0px"}
      >
        <form
          name="contact"
          method="post"
          data-netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }} w={"100%"}>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="40px">
              <input type="hidden" name="form-name" value="contact" />

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
            <Input type="text" name="subject" size="md" placeholder="Subject" />
          </FormControl>
          <FormControl id="message" margin={"40px 0px"}>
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
            <center>
              <Button
                margin={"40px"}
                type="submit"
                variant="solid"
                bg="#f56565"
                color="white"
                _hover={{}}
              >
                Send Message
              </Button>
            </center>
          </FormControl>
        </form>
      </Box>
      {/* </Box> */}
    </Container>
  );
}
