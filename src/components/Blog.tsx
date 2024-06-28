import React, { useState } from 'react';
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
  Flex,
  Button,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => (
        <Tag size={'md'} variant='solid' colorScheme='red' key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: string;
  name: string;
}

const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop='2' spacing='2' display='flex' alignItems='center'>
      <Image
        borderRadius='full'
        boxSize='40px'
        src='https://100k-faces.glitch.me/random-image'
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight='medium'>{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date}</Text>
    </HStack>
  );
};

type SwiperNavButtonsProps = {
  handleButtonAction: (direction: 'left' | 'right') => void;
  currentIndex: number;
  maxIndex: number;
};

const SwiperNavButtons: React.FC<SwiperNavButtonsProps> = ({
  handleButtonAction,
  currentIndex,
  maxIndex,
}) => {
  const swiper = useSwiper();

  return (
    <Flex gap={3} justifyContent={'center'} mt={4}>
      <IconButton
        onClick={() => {
          swiper.slidePrev();
          handleButtonAction('left');
        }}
        disabled={currentIndex === 0}
        p='0'
        size='fit-content'
        backgroundColor='transparent'
        _hover={{ backgroundColor: 'transparent' }}
        aria-label={'move left'}
        icon={
          <FaCircleChevronLeft
            size={30}
            color={currentIndex === 0 ? 'gray' : 'black'}
          />
        }
      />
      <IconButton
        onClick={() => {
          swiper.slideNext();
          handleButtonAction('right');
        }}
        disabled={currentIndex >= maxIndex}
        p='0'
        size='fit-content'
        backgroundColor='transparent'
        _hover={{ backgroundColor: 'transparent' }}
        aria-label={'move right'}
        icon={
          <FaCircleChevronRight
            size={30}
            color={currentIndex >= maxIndex ? 'gray' : 'black'}
          />
        }
      />
    </Flex>
  );
};

interface BlogFrontmatter {
  date: string | null;
  title: string | null;
  author: string | null;
  description: string | null;
  image: string | null;
  slug: string | null;
}

interface BlogEdge {
  blog: {
    frontmatter: BlogFrontmatter;
  };
}

interface BlogPageType {
  edges: BlogEdge[];
}

const FeaturedBlogs: React.FC<BlogPageType> = ({ edges }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleButtonAction = (action: string) => {
    if (action === 'right') {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    }
    if (action === 'left') {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const [isLargerThan968] = useMediaQuery('(min-width: 968px)');
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const cardsToShow = (isLargerThan968 && 3) || (isLargerThan768 && 2) || 1;

  const blogList = edges;
  const maxIndex = blogList.length - cardsToShow;

  return (
    <Container maxW={'6xl'} as='section' p='12'>
      <Heading as='h2' marginTop='5' textAlign={'center'}>
        Latest articles
      </Heading>
      <Divider marginTop='2' width='60px' marginX='auto' color={'black'} />
      <Swiper
        spaceBetween={20}
        slidesPerView={cardsToShow}
        className='flex'
        style={{ marginTop: '20px' }}
      >
        {blogList.map((item, index: number) => (
          <SwiperSlide key={index}>
            <Box
              w='100%'
              border='1px solid'
              borderColor='gray.200'
              borderRadius='lg'
              overflow='hidden'
              p='6'
              height='550px'
            >
              <Box borderRadius='lg' overflow='hidden' height='200px'>
                <Link
                  textDecoration='none'
                  _hover={{ textDecoration: 'none' }}
                >
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
              <BlogTags tags={['Engineering', 'Product']} marginTop='3' />
              <Heading fontSize='xl' marginTop='2' noOfLines={2}>
                <Link
                  textDecoration='none'
                  _hover={{ textDecoration: 'none' }}
                >
                  {item.blog.frontmatter?.title}
                </Link>
              </Heading>
              <Text as='p' fontSize='md' marginTop='2' noOfLines={3}>
                {item.blog.frontmatter?.description}
              </Text>
              <Box marginTop='4'>
              <Link href={`/blog/${item.blog.frontmatter.slug}`} textDecoration='none' _hover={{ textDecoration: 'none' }}>
        <Button colorScheme='red' variant='outline'> Show More </Button>
      </Link>

</Box>

              <BlogAuthor
                name={item.blog.frontmatter?.author!}
                date={item.blog.frontmatter?.date!}
              />
            </Box>
          </SwiperSlide>
        ))}
        <SwiperNavButtons
          handleButtonAction={handleButtonAction}
          currentIndex={currentIndex}
          maxIndex={maxIndex}
        />
      </Swiper>
    </Container>
  );
};

export default FeaturedBlogs;
