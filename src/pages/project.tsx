import * as React from 'react';
import { PageProps, graphql } from 'gatsby';
import { Container, Heading, VStack, Text } from '@chakra-ui/react';

interface ProjectProp {
  image: string;
  title: string;
  description: string;
}

export const Project = ({ data }: PageProps<Queries.ProjectQuery>) => {
  const project = data.projectInfo.edges;

  return (
    <Container maxW={'6xl'} as='section' p='12'>
      <VStack paddingTop='40px' spacing='2' alignItems='flex-start'>
        <Heading as='h2'>{project.node.frontmatter.title}</Heading>
        <Text as='p' fontSize='lg'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack>
    </Container>
  );
};

export const query = graphql`
  query Project {
    projectInfo: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "project-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            image
            title
            description
          }
        }
      }
    }
  }
`;
