import React from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  SpaceProps,
  Container,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { BlogPageType } from '../pages';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
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

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor: React.FC<BlogAuthorProps> = ({ date, name }) => {
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
      <Text>{date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const FeaturedBlogs: React.FC<BlogPageType> = ({ edges }) => {
  // Create a mutable copy of the edges array and sort it by date in descending order
  const sortedBlogList = [...edges].sort(
    (a, b) =>
      new Date(b.blog.frontmatter?.date ?? 0).getTime() -
      new Date(a.blog.frontmatter?.date ?? 0).getTime()
  );

  // Get the most recent 3 blogs
  const blogList = sortedBlogList.slice(0, 3);

  return (
    <Container maxW={'6xl'} as='section' p='12'>
      <Heading as='h2' marginTop='5' textAlign={'center'}>
        Latest articles
      </Heading>
      <Divider marginTop='2' width='60px' marginX='auto' color={'black'} />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} marginTop='5'>
        {blogList.map((item, index: number) => {
          // Process tags to ensure they are non-null and of the correct type
          const tags = (item.blog.frontmatter?.tags ?? []).map(tag => tag?.tag).filter(Boolean) as string[];

          return (
            <Box
              key={index}
              w='100%'
              border='1px solid'
              borderColor='gray.200'
              borderRadius='lg'
              overflow='hidden'
              p='6'
              height='470px'
            >
              <Box borderRadius='lg' overflow='hidden' height='200px'>
                <Link textDecoration='none' _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform='scale(1.0)'
                    src={item.blog.frontmatter?.image!}
                    alt='some text'
                    objectFit='cover'
                    height='100%'
                    width='100%'
                    transition='0.3s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}
                  />
                </Link>
              </Box>
              <BlogTags tags={tags} marginTop='3' />
              <Heading fontSize='xl' marginTop='2' noOfLines={2}>
                <Link href={`${item.blog.fields?.slug}`} textDecoration='none' _hover={{ textDecoration: 'none' }}>
                  {item.blog.frontmatter?.title}
                </Link>
              </Heading>
              <Text as='p' fontSize='md' marginTop='2' noOfLines={3}>
                {item.blog.frontmatter?.description}
              </Text>
              <BlogAuthor name={item.blog.frontmatter?.author!} date={new Date(item.blog.frontmatter?.date!)} />
            </Box>
          );
        })}
      </SimpleGrid>
      <Box textAlign='center' marginTop='5'>
        <Button as={Link} href='/all-blogs' colorScheme='red' size='lg'>
          View All
        </Button>
      </Box>
    </Container>
  );
};

export default FeaturedBlogs;
