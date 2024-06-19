import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IndexPageFrontmatterType } from "../pages";

interface Props {
  children: React.ReactNode;
}

type testimonialType = NonNullable<IndexPageFrontmatterType>["testimonials"];

const Testimonial = (props: Props) => {
  const { children } = props;

  return (
    <Box display={"flex"} flexDir={"column"} flexBasis={0} flexGrow={1}>
      {children}
    </Box>
  );
};

const TestimonialContent = (props: Props) => {
  const { children } = props;

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = (props: Props) => {
  const { children } = props;

  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props: Props) => {
  const { children } = props;

  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function Testimonials(props: testimonialType) {
  return (
    <Box
      id="testimonial"
      as="section"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <Container maxW={"6xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>{props?.title}</Heading>
          <Text>{props?.description}</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          {props?.testimonial?.map((item) => {
            if (item) {
              return (
                <Testimonial>
                  <TestimonialContent>
                    <TestimonialHeading>{item.title}</TestimonialHeading>
                    <TestimonialText>{item.description}</TestimonialText>
                  </TestimonialContent>
                  <TestimonialAvatar
                    src={item.profile!}
                    name={item.name!}
                    title={item.bio!}
                  />
                </Testimonial>
              );
            }
            return <></>;
          })}
        </Stack>
      </Container>
    </Box>
  );
}
