'use client';
import React, { useState } from 'react';
import { ProjectPageType } from '../pages';
import {
  Container,
  Heading,
  Text,
  VStack,
  Link,
  Flex,
  WrapItem,
  Image,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  FaArrowRightLong,
  FaCircleChevronLeft,
  FaCircleChevronRight,
} from 'react-icons/fa6';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Types for SwiperNavButtons props
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
    <Flex gap={4} justifyContent={'center'} mt={4}>
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

// Slide component types:
type NodeType = {
  frontmatter: {
    title: string | null;
    description: string | null;
    image: string | null;
    slug: string | null;
  } | null;
};

const Slide = ({ node, index }: { node: NodeType; index: number }) => {
  return (
    <WrapItem
      key={index}
      justifyContent='space-between'
      flexDirection='column'
      color='black.300'
      bg='base.d100'
      rounded={5}
      flex={1}
      py={5}
      pt={0}
    >
      <VStack mb={6}>
        <Flex
          height={150}
          w={'full'}
          overflow={'hidden'}
          borderRadius={10}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            src={node.frontmatter?.image || undefined}
            alt={node.frontmatter?.title || undefined}
            rounded={3}
            w={'full'}
            minWidth={'fit-content'}
            h={'full'}
          />
        </Flex>
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
        color='red.400'
        href={`projects/${node.frontmatter?.slug}`}
        colorScheme='green'
        fontWeight='bold'
        size='sm'
        display={'flex'}
        alignItems={'center'}
        gap={1}
      >
        View Details
        <FaArrowRightLong />
      </Link>
    </WrapItem>
  );
};

type projectType = NonNullable<ProjectPageType>;

export default function Projects(projects: projectType) {
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

  const projectList = projects.edges;
  const maxIndex = projectList.length - cardsToShow;

  return (
    <Container id='services' as='section' maxW={'6xl'} py={12}>
      <Heading mb={6} textAlign={'center'}>
        Projects
      </Heading>
      <Swiper spaceBetween={20} slidesPerView={cardsToShow} className='flex'>
        {projectList.map(({ node }, index: number) => (
          <SwiperSlide key={index}>
            <Slide node={node} index={index} />
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
}
