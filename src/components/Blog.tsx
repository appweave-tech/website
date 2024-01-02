import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { BlogPageEdgeType, BlogPageType } from "../pages";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: string;
  name: string;
}

type blogType = NonNullable<BlogPageType>;

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date}</Text>
    </HStack>
  );
};

const FeaturedBlogs = (blogs: blogType) => {
  console.log(typeof blogs)
  return (
    <Container maxW={"6xl"} as="section" p="12">
      <Heading as="h2" marginTop="5" textAlign={"center"}>
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Flex
        marginTop="5"
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        rowGap={"100"}
      >
        {blogs.edges.map((item) => {
          return (
            <WrapItem width={{ base: "100%", sm: "45%", md: "30%" }}>
              <Box w="100%">
                <Box borderRadius="lg" overflow="hidden">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Image
                      transform="scale(1.0)"
                      src={item.blog.frontmatter?.image!}
                      alt="some text"
                      objectFit="contain"
                      width="100%"
                      transition="0.3s ease-in-out"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                    />
                  </Link>
                </Box>
                <BlogTags tags={["Engineering", "Product"]} marginTop="3" />
                <Heading fontSize="xl" marginTop="2">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {item.blog.frontmatter?.title}
                  </Link>
                </Heading>
                <Text as="p" fontSize="md" marginTop="2">
                  {item.blog.frontmatter?.description}
                </Text>
                <BlogAuthor
                  name={item.blog.frontmatter?.author!}
                  date={item.blog.frontmatter?.date!}
                />
              </Box>
            </WrapItem>
          );
        })}
      </Flex>
    </Container>
  );
};

export default FeaturedBlogs;
