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
  Flex,
  Stack,
  useColorModeValue,
  extendTheme,
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

export type ContactType = NonNullable<IndexPageFrontmatterType>["contact"];
const theme = extendTheme({
  textStyles: {
    h1: {
      baseStyle: {
        textDecoration: "none",
      },
    },
  },
});
export default function Contact(props: ContactType) {
  return (
    <Container
      id="contact"
      maxW={"100%"}
      mt={0}
      centerContent
      overflow="hidden"
      as="section"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <Box
         bg={useColorModeValue("gray.100", "gray.700")}
        justifySelf={"center"}
        margin={"2px 4em"}
        w={"100%"}
      >
        <Heading textAlign={"center"}>Contact us</Heading>
        <Text
          mt={{ sm: 3, md: 3, lg: 5 }}
          color={useColorModeValue("gray.600", "gray.400")}
          textAlign={"center"}
        >
          Fill up the form below to contact
        </Text>
      </Box>

      <Box
        py={{ base: 5, lg: 10 }}
        w={"100%"}
        bg={useColorModeValue("gray.100", "gray.700")}
        display={"flex"}
        placeItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <SimpleGrid
          columns={{ sm: 1, md: 3 }}
          spacing={{ sm: "3rem", md: "3rem", lg: "6rem" }}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          <Flex
            w={48}
         
            align={"center"}
            justify={"center"}
            color={useColorModeValue("gray.600", "gray.400")}
            rounded={"full"}
            bg={useColorModeValue("gray.100", "gray.700")}
           
          >
            <Stack placeItems={"center"}  mt={5}>
              <MdLocationOn color="#f56565" size="3rem"  />
              <Text
              
                color={useColorModeValue("gray.600", "gray.400")}
                fontWeight={"600"}
                fontFamily={"var(--chakra-colors-chakra-body-text)"}
                fontSize={"1rem"}
              >
                ADDRESS
              </Text>
              <Text
                m={0}
                color="gray.500"
                fontSize={"0.8rem"}
               
              >
                {props?.address}
              </Text>
            </Stack>
          </Flex>

          <Flex
            w={48}
          
            align={"center"}
            justify={"center"}
            color={useColorModeValue("gray.600", "gray.400")}
            rounded={"full"}
            bg={useColorModeValue("gray.100", "gray.700")}
            mb={1}
          >
            <Link
              href={"tel:" + props?.phoneNumber}
              isExternal
              display={"flex"}
              justifyContent={"center"}
            
            >
              <Stack placeItems={"center"}>
                <MdPhone color="#f56565" size="3rem" />
                <Text color={useColorModeValue("gray.600", "gray.400")} textAlign={"center"} fontWeight={"600"}>
                  PHONE NUMBER
                </Text>
                <Text
                  color="gray.500"
                  textAlign={"center"}
                  sx={{ textDecoration: "none" }}
                >
                  {props?.phoneNumber}
                </Text>
              </Stack>
            </Link>
          </Flex>
          <Flex
            w={48}
            align={"center"}
            justify={"center"}
            color={useColorModeValue("gray.600", "gray.400")}
            rounded={"full"}
            bg={useColorModeValue("gray.100", "gray.700")}
            mb={1}
          >
            <Link
              href={"mailto:" + props?.email}
              isExternal
              display={"flex"}
              justifyContent={"center"}
            >
              <Stack placeItems={"center"}>
                <MdEmail color="#f56565" size="3rem" />
                <Text color={useColorModeValue("gray.600", "gray.400")} fontWeight={"600"} textAlign={"center"}>
                  EMAIL
                </Text>
                <Text color="gray.900" textAlign={"center"}>
                  {props?.email}
                </Text>
              </Stack>
            </Link>
          </Flex>
        </SimpleGrid>
      </Box>

      <Box
        boxShadow="md"
        p="6"
        rounded="md"
        bg={useColorModeValue("white", "gray.600")}
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
    </Container>
  );
}
