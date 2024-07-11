import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Tag,
  Container,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { graphql, PageProps, Link } from 'gatsby';
import PaginationContainer from '../components/Pagination';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: number | string;
}

interface AllBlogsProps extends PageProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: BlogPost;
      }[];
    };
  };
  pageContext: {
    currentPage: number;
    numPages: number;
    limit: number;
    skip: number;
  };
}

interface BlogPost {
  id: string;
  frontmatter: {
    title: string;
    description: string;
    image: string;
    author: string;
  };
  fields: {
    slug: string;
  };
}

const BlogTags: React.FC<IBlogTags> = ({ tags, marginTop }) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <Tag size={'md'} variant='solid' colorScheme='red' key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

const BlogAuthor: React.FC<{ date: string; name: string }> = ({ date, name }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{new Date(date).toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList: React.FC<AllBlogsProps> = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const blogs = data.allMarkdownRemark.edges;

  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">All Blogs</Heading>
      {blogs.map(({ node }) => (
        <Box
          key={node.id}
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }} // Column for mobile, Row for desktop
          marginBottom="6" // Add margin between articles
        >
          <Box
            width={{ base: '100%', md: '40%' }}
            zIndex="2"
            marginTop="2%"
            marginRight={{ base: '0', md: '5%' }}
          >
            <Link to={node.fields.slug} style={{ textDecoration: 'none' }}>
              <Image
                borderRadius="md"
                src={node.frontmatter.image || 'https://via.placeholder.com/800?text=Placeholder'}
                alt={node.frontmatter.title}
                objectFit="cover"
                width="98%"
                height="auto"
              />
            </Link>
          </Box>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <BlogTags tags={['Engineering', 'Product']} marginTop="1" />
            <Heading marginTop="1">
              <Link to={node.fields.slug} style={{ textDecoration: 'none' }}>
                {node.frontmatter.title}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg"
            >
              {node.frontmatter.description}
            </Text>
            <BlogAuthor name={node.frontmatter.author} date="2024-04-06T19:01:27Z" />
          </Box>
        </Box>
      ))}
       <PaginationContainer currentPage={currentPage} numPages={numPages} />
    </Container>
  );
};

export const query = graphql`
  query GetAllBlogPosts($skip: Int, $limit: Int) {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-page" } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            image
            author
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default ArticleList;
