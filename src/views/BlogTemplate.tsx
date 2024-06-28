import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Heading, Text, Image, Box, Flex } from '@chakra-ui/react';

export type BlogPageProps = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        description: string;
        image: string;
        author: string;
        date: string;
      };
    };
  };
};

const BlogTemplate: React.FC<BlogPageProps> = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const imagePath = frontmatter.image;

  return (
    <>
      <Navbar />
      <Container maxW={'6xl'} as='main' my={4}>
        <Flex height={300} w={'full'} overflow={'hidden'} borderRadius={10} justifyContent={'center'} alignItems={'center'}>
          {imagePath && (
            <Image
              src={imagePath}
              alt={frontmatter.title}
              width={'full'}
              minWidth={'fit-content'}
              minHeight={'full'}
            />
          )}
        </Flex>
        <Heading as='h2' fontSize={40} mt={4}>
          {frontmatter.title}
        </Heading>
        <Text fontSize='lg' mt={2} fontWeight={500}>
          {frontmatter.description}
        </Text>
        <Text fontSize='md' mt={2} fontWeight={400}>
          By {frontmatter.author} on {frontmatter.date}
        </Text>
        <Box mt={4} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </>
  );
};

export default BlogTemplate;
