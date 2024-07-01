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
              <Link href={"/#about"}>About us</Link>
              <Link href={"/#services"}>Services</Link>
              <Link href={"/#testimonial"}>Testimonials</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Support</ListHeader>
              <Link href={"#"}>FAQs</Link>
              <Link href={"#"}>Terms of Service</Link>
              <Link href={"#"}>Privacy Policy</Link>
            </Stack>
            <Stack direction={"column"} spacing={4} align={"flex-start"}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter size={"2rem"} />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube size={"2rem"} />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram size={"2rem"} />
              </SocialButton>
            </Stack>
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
