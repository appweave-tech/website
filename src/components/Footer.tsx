import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";
import SocialButton from "./SocialButton";
import { ContactType } from "./Contact";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

type FooterPropType = { contact: ContactType };

export default function Footer(props: FooterPropType) {
  return (
    <Box
      as="footer"
      borderTop={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr", md: "1fr 3fr" }}
          templateRows={{ sm: "1fr 1fr", md: "1fr" }}
          spacing={"50"}
        >
          <Stack spacing={6}>
            <Box>
              <Logo colorSecondary={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"}>
              © 2022 Chakra Templates. All rights reserved
            </Text>
          </Stack>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr 1fr", md: "1fr 1fr 1fr" }}
          >
            <Stack align={"flex-start"}>
              <ListHeader>Company</ListHeader>
              <Link 
                  href={"#about"}
                  _hover={{
                    textDecoration: "none",
                  }}
                  >About us</Link>
              <Link 
                   href={"#services"}
                   _hover={{
                    textDecoration: "none",
                  }}
                  >Services</Link>
              <Link 
                   href={"#testimonial"}
                   _hover={{
                    textDecoration: "none",
                  }} 
                  >Testimonials</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Support</ListHeader>
              <Link 
                   href={"#"} 
                   _hover={{
                    textDecoration: "none",
                  }}>
                    FAQs</Link>
              <Link 
                  href={"#"} 
                  _hover={{
                    textDecoration: "none",
                  }} >Terms of Service</Link>
              <Link 
                  href={"#"}  
                  _hover={{
                    textDecoration: "none",
                  }} >Privacy Policy</Link>
            </Stack>
            <Stack direction={"column"} spacing={1} align={"flex-start"}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter size={"3rem"} />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube size={"3rem"} color="red.400" />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram size="2rem" color="red.400"/>
              </SocialButton>
            </Stack>
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
