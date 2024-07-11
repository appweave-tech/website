import React from 'react';
import Navbar from '../components/Navbar';
import { graphql } from 'gatsby';
import {
  Container,
  Heading,
  Text,
  Image,
  Box,
  Flex,
  Divider,
  VStack,
} from '@chakra-ui/react';


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
        tags: Array<{ tag: string | null }>;
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
  const { title, description, image, author, date, tags } = frontmatter;

  return (
    <>
      <Navbar />
      <Container maxW={'6xl'} as='main' my={8}>
        <Flex height={300} w={'full'} overflow={'hidden'} borderRadius={10} justifyContent={'center'} alignItems={'center'}>
          {image && (
            <Image
              src={image}
              alt={title}
              width={'full'}
              minWidth={'fit-content'}
              minHeight={'full'}
              objectFit='cover'
            />
          )}
        </Flex>
        <VStack align='start' spacing={4} mt={8}>
          <Heading as='h1' fontSize='3xl'>
            {title}
          </Heading>
          <Text fontSize='lg' fontWeight='medium'>
            {description}
          </Text>
          <Divider />
          <Flex align='center' justify='start' width='full'>
            <Image
              borderRadius='full'
              boxSize='40px'
              src='https://100k-faces.glitch.me/random-image'
              alt={`Avatar of ${author}`}
              mr={4}
            />
            <Text fontSize='sm' fontWeight='light' color='gray.600'>
              By {author} on {date}
            </Text>
          </Flex>
          <Box as='article' mt={4}>
            <Box
              className='blog-content'
              dangerouslySetInnerHTML={{ __html: html }}
              sx={{
                'h1, h2, h3, h4, h5, h6': {
                  fontWeight: 'bold',
                  mt: 4,
                  mb: 2,
                },
                p: {
                  mt: 2,
                  mb: 2,
                  lineHeight: 'tall',
                },
                a: {
                  color: 'teal.500',
                  textDecoration: 'underline',
                },
                ul: {
                  listStyleType: 'disc',
                  ml: 5,
                },
                ol: {
                  listStyleType: 'decimal',
                  ml: 5,
                },
                blockquote: {
                  borderLeft: '4px solid',
                  borderColor: 'gray.200',
                  pl: 4,
                  color: 'gray.600',
                  fontStyle: 'italic',
                },
              }}
            />
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default BlogTemplate;

export const query = graphql`
  query BlogBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        image
        author
        date(formatString: "MMMM DD, YYYY")
        tags {
          tag
        }
      }
    }
  }
`;
