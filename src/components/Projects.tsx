'use client';
import React, { useEffect, useState, useRef } from 'react';
import { PageProps, graphql } from 'gatsby';
import {
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Button,
  Flex,
  Link,
  Box,
  WrapItem,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { ProjectPageType } from '../pages';

const MotionBox = motion(Box);

const ChakraCarousel = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <HStack
      ref={ref}
      spacing={4}
      overflow='hidden'
      w='full'
      p={2}
      flex={1}
      alignItems={'stretch'}
    >
      {children}
    </HStack>
  );
});

type projectType = NonNullable<ProjectPageType>;

export default function Projects(projects: projectType) {
  const projectList = projects.edges;

  const carouselContainer = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 350; // Width of each item in the carousel
  const itemsToShow = 3; // Number of items to show at a time
  const totalItems = 10; // Total number of items to fetch and display

  const maxIndex = projectList.length - itemsToShow;

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
      <Heading mb={6} textAlign={'center'}>
        Projects
      </Heading>
      <Flex justifyContent='space-between' alignItems='center'>
        <IconButton
          onClick={() => handleButtonAction('left')}
          disabled={currentIndex === 0}
          p='0'
          size='fit-content'
          backgroundColor='transparent'
          _hover={{ backgroundColor: 'transparent' }}
          aria-label={''}
        >
          <FaCircleChevronLeft size={30} />
        </IconButton>
        <Box overflow='hidden' w='full' mx={4}>
          <MotionBox
            display='flex'
            animate={{ x: -currentIndex * itemWidth }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            w={`${projectList.length * itemWidth}px`}
          >
            <ChakraCarousel ref={carouselContainer}>
              {projectList.map(({ node }, index) => (
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
                    <Image
                      src={node.frontmatter?.image || undefined}
                      alt={node.frontmatter?.title || undefined}
                      h={150}
                      w={'full'}
                    />
                    <Heading
                      fontSize={{ base: 'xl', md: '2xl' }}
                      textAlign='left'
                      w='full'
                      mb={2}
                    >
                      {node.frontmatter?.title}
                    </Heading>
                    <Text w='full' noOfLines={2}>
                      {node.frontmatter?.description}
                    </Text>
                  </VStack>

                  <Link
                    color='teal.500'
                    href={`projects/${node.frontmatter?.slug}`}
                    colorScheme='green'
                    fontWeight='bold'
                    color='gray.900'
                    size='sm'
                  >
                    View Details
                  </Link>
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
          aria-label={''}
        >
          <FaCircleChevronRight size='30' />
        </IconButton>
      </Flex>
    </Container>
  );
}
