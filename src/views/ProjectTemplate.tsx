import React from 'react';
import { graphql } from 'gatsby';
import Navbar from '../components/Navbar';
import { Container, Heading, VStack, Text, Image, Box } from '@chakra-ui/react';
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';

const ProjectTemplate = ({ data }) => {
  console.log('data:', data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const imagePath = frontmatter.image;

  return (
    <>
      <Navbar />
      <Container maxW={'6xl'} as='main'>
        {imagePath && <Image src={imagePath} alt={frontmatter.title} h={300} w={'full'}/>}
        <Heading as='h1' size='2xl' mt={4}>
          {frontmatter.title}
        </Heading>
        <Text fontSize='lg' mt={2}>
          {frontmatter.description}
        </Text>
        <Box mt={4} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </>
  );
};

// export const query = graphql`
//   query ProjectByTitle($slug: String!) {
//     markdownRemark(frontmatter: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//         description
//         image
//       }
//     }
//   }
// `;

export default ProjectTemplate;
