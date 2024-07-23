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
import { FaXTwitter,FaLinkedinIn,FaGithub } from "react-icons/fa6";
import Logo from "./Logo";
import SocialButton from "./SocialButton";
import { ContactType } from "./Contact";
import { IndexPageFrontmatterType } from "../pages";
export type FooterType = NonNullable<IndexPageFrontmatterType>["footer"];
const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};
const currYear = new Date().getFullYear();
type FooterPropType = { footerprops: FooterType };

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
            &#169;  {currYear} Appweave Labs. All rights reserved
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
            <Stack 
            direction={{base :"row", sm : "column", md: "column" , lg: "column"}}
             mt={{base : "1rem", sm:0,md:0,lg:0}} spacing={2} align={"flex-start"}>
              <SocialButton label={"Twitter"} href={props?.footerprops?.social?.twiter?.link!}>
                <FaXTwitter size={props?.footerprops?.social?.twiter?.size!} />
              </SocialButton>
              <SocialButton label={"linkedin"} href={props?.footerprops?.social?.linkedin?.link!}>
                <FaLinkedinIn size={props?.footerprops?.social?.linkedin?.size!} color="red.400" />
              </SocialButton>
              <SocialButton label={"github"} href={props?.footerprops?.social?.Github?.link!}>
                <FaGithub size={props?.footerprops?.social?.Github?.size!} color="red.400"/>
              </SocialButton>
            </Stack>
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
