import React from 'react';
import { graphql } from 'gatsby';
import { Container, Heading, Text, Image, Box, Flex } from '@chakra-ui/react';
import Layout from '../components/layout';

export type ProjectPageProps = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        description: string;
        image: string;
      };
    };
  };
};

const ProjectTemplate = ({ data }: ProjectPageProps) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const imagePath = frontmatter.image;

  return (
    <Layout>
      <Container maxW={'6xl'} as='main' my={4}>
        <Flex
          height={300}
          w={'full'}
          overflow={'hidden'}
          borderRadius={10}
          justifyContent={'center'}
          alignItems={'center'}
        >
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
    </Layout>
  );
};

export default ProjectTemplate;

export const query = graphql`
  query ProjectBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        image
      }
    }
  }
`;
