import { chakra, useColorModeValue, VisuallyHidden, Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      colorScheme={"red"}
      bg={"red.400"}
      rounded={"full"}
      w={10}
      h={10}
      p= {2}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      
      _hover={{
        bg: "red.500",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default SocialButton;