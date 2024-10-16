import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Flex,
  useColorModeValue,
  Image,
  Link,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import React from "react";
import { IndexPageFrontmatterType } from "../pages";

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
      <Flex
        maxW={{ base: "4xl", sm: "4xl", md: "6xl", lg: "6xl" }}
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        m={{
          base: "0rem 2rem",
          sm: "0rem 2rem",
          md: "0rem 4rem",
          lg: "0rem 4rem",
        }}
        gap={{ base: "1rem", sm: "1rem", md: "2rem", lg: "3rem" }}
      >
        {/* left box */}

        <Box
          w={{ base: "100%", sm: "100%", md: "32rem", lg: "28rem" }}
          order={{ base: 2, sm: 2, md: 2, lg: 1 }}
          boxShadow="md"
          m={"1rem auto 3rem auto"}
          p="1rem"
          rounded="md"
          bg={useColorModeValue("white", "gray.600")}
          borderRadius="lg"
        >
          <Box
            w={{ base: "20rem", sm: "28rem", md: "32rem", lg: "28rem" }}
            mb={4}
            textAlign={"center"}
            mt={0}
          >
            <Text
              fontSize={22}
              fontWeight={600}
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
            <Box w={{ base: "100%", sm: "100%", md: "28rem", lg: "26rem" }}>
              <input type="hidden" name="form-name" value="contact" />
              <FormControl id="name" margin={"1rem 0rem"} isRequired>
                <FormLabel>Your Name</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <BsPerson color="gray.800" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="name"
                    size="md"
                    w={{ base: "20rem", sm: "20rem", md: "28rem", lg: "26rem" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="email" margin={"1rem 0rem"} isRequired>
                <FormLabel>Mail</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail color="gray.800" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="email"
                    size="md"
                    w={{ base: "20rem", sm: "20rem", md: "28rem", lg: "26rem" }}
                  />
                </InputGroup>
              </FormControl>
            </Box>

            <FormControl id="Subject" margin={"1rem 0rem"} isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                type="text"
                w={{ base: "20rem", sm: "20rem", md: "28rem", lg: "26rem" }}
                name="subject"
                size="md"
                placeholder="Subject"
              />
            </FormControl>
            <FormControl id="message" margin={"1rem 0rem"} isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                borderColor="gray.300"
                w={{ base: "20rem", sm: "20rem", md: "28rem", lg: "26rem" }}
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
                    background: "red.500",
                  }}
                >
                  Send Message
                </Button>
              </Flex>
            </FormControl>
          </form>
        </Box>
        {/*  rigth box */}
        <Box
          w={{ base: "24rem", sm: "32rem", md: "34rem", lg: "32rem" }}
          order={{ base: 1, sm: 1, md: 1, lg: 2 }}
        >
          <Box justifySelf={"center"} margin={"0px auto"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
              textAlign={"center"}
            >
              <Text
                as={"span"}
                position={"relative"}
                zIndex={1}
                _after={{
                  content: "''",
                  width: "full",
                  height: { base: "20%", sm: "20%", md: "30%", lg: "30%" },
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
            top={12}
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            margin={"0rem auto"}
            height={"24rem"}
            rounded={"2xl"}
            width={{ sm: "lg", md: "full", lg: "full" }}
            overflow={"hidden"}
          >
            <Image
              alt={"contact image"}
              fit={"contain"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={props?.contactImage!}
            />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
