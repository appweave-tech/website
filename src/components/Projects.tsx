'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Heading,
  Text,
  Tag,
  HStack,
  VStack,
  Button,
  Flex,
  Box,
  WrapItem,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ChakraCarousel = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <HStack ref={ref} spacing={4} overflow='hidden' w='full'>
      {children}
    </HStack>
  );
});

export default function Projects() {
  const [data, setData] = useState([]);
  const carouselContainer = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 400; // Width of each item in the carousel
  const itemsToShow = 3; // Number of items to show at a time
  const totalItems = 10; // Total number of items to fetch and display

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
      .then((res) => res.json())
      .then((res) => setData(res.slice(0, totalItems))); // Fetching first 10 items
  }, []);

  const maxIndex = data.length - itemsToShow;

  const handleButtonAction = (action: string) => {
    if (action === 'right') {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    }
    if (action === 'left') {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <Container id='services' as='section' maxW={'6xl'} py={12}>
      <Heading mb={6}>Projects</Heading>
      <Flex justifyContent='space-between' alignItems='center'>
        <Button
          onClick={() => handleButtonAction('left')}
          disabled={currentIndex === 0}
          p='0'
          size='fit-content'
          backgroundColor='transparent'
          _hover={{ backgroundColor: 'transparent' }}
        >
          <FaCircleChevronLeft size={30} />
        </Button>
        <Box overflow='hidden' w='full' mx={4}>
          <MotionBox
            display='flex'
            animate={{ x: -currentIndex * itemWidth }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            w={`${data.length * itemWidth}px`}
          >
            <ChakraCarousel ref={carouselContainer}>
              {data.map((post, index) => (
                <WrapItem
                  key={index}
                  boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                  justifyContent='space-between'
                  flexDirection='column'
                  maxWidth={`${itemWidth}px`}
                  color='gray.300'
                  bg='base.d100'
                  rounded={5}
                  flex={1}
                  p={5}
                >
                  <VStack mb={6}>
                    <Heading
                      fontSize={{ base: 'xl', md: '2xl' }}
                      textAlign='left'
                      w='full'
                      mb={2}
                    >
                      {post.title}
                    </Heading>
                    <Text w='full'>{post.body}</Text>
                  </VStack>

                  <Button
                    onClick={() => alert(`Post ${post.id} clicked`)}
                    colorScheme='green'
                    fontWeight='bold'
                    color='gray.900'
                    size='sm'
                  >
                    View Details
                  </Button>
                </WrapItem>
              ))}
            </ChakraCarousel>
          </MotionBox>
        </Box>
        <IconButton
          onClick={() => handleButtonAction('right')}
          disabled={currentIndex >= maxIndex}
          p='0'
          size='fit-content'
          backgroundColor='transparent'
          _hover={{ backgroundColor: 'transparent' }}
        >
          <FaCircleChevronRight size='30' />
        </IconButton>
      </Flex>
    </Container>
  );
}
