import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Heading, Text, Image, Box, Flex } from '@chakra-ui/react';
import { ProjectPageProps } from '../pages/projects/[slug]';

const ProjectTemplate = ({ data }: ProjectPageProps) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const imagePath = frontmatter.image;

  return (
    <>
      <Navbar />
      <Container maxW={'6xl'} as='main' mt={4}>
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
        <Box mt={4} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </>
  );
};

export default ProjectTemplate;
