import {  VisuallyHidden, Button } from "@chakra-ui/react";
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
      w={{base : 6 ,sm : 8, md : 10, lg:10 }}
      h={{base : 9 ,sm : 8, md : 10, lg:10 }}
      p= {{base : 2 ,sm : 2, md : 2, lg:2 }}
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