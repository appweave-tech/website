import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
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
    >
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Link href={"tel:" + props?.phoneNumber} isExternal display={'fled'} gap={'8px'} alignItems={'center'}>
                        <MdPhone color="#1970F1" size="20px" />{" "}
                        {props?.phoneNumber}
                      </Link>

                      <Link href={"mailto:" + props?.email} isExternal display={'fled'} gap={'8px'} alignItems={'center'}>
                        <MdEmail color="#1970F1" size="20px" />{" "}
                        {props?.email}
                      </Link>

                      <Link display={'fled'} gap={'8px'} alignItems={'center'}>
                        <MdLocationOn color="#1970F1" size="20px" />{" "}
                        {props?.address}
                      </Link>
                    </VStack>
                  </Box>
                  <HStack
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
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <form name="contact" method="post" data-netlify-honeypot="bot-field" data-netlify="true">
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
                          <Button
                            type="submit"
                            variant="solid"
                            bg="#0D74FF"
                            color="white"
                            _hover={{}}
                          >
                            Send Message
                          </Button>
                        </FormControl>
                      </form>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
