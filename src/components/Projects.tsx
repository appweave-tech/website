'use client';
import React, { useState } from 'react';
import { ProjectPageType } from '../pages';
import {
  Container,
  Heading,
  Flex,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ProjectSlide } from './ProjectSlide';

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
    <Flex gap={4} justifyContent={'center'} mt={6}>
      <IconButton
        onClick={() => {
          swiper.slidePrev();
          handleButtonAction('left');
        }}
        isDisabled={currentIndex === 0}
        size='fit-content'
        backgroundColor='transparent'
        _hover={{ backgroundColor: 'transparent' }}
        aria-label={'move left'}
        icon={<FaCircleChevronLeft size={30} />}
      />
      <IconButton
        onClick={() => {
          swiper.slideNext();
          handleButtonAction('right');
        }}
        isDisabled={currentIndex >= maxIndex}
        size='fit-content'
        backgroundColor='transparent'
        _hover={{ backgroundColor: 'transparent' }}
        aria-label={'move right'}
        icon={<FaCircleChevronRight size={30} />}
      />
    </Flex>
  );
};

type projectType = NonNullable<ProjectPageType>;

export default function Projects({ edges }: projectType) {
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

  const projectList = edges;
  const maxIndex = projectList.length - cardsToShow;

  return (
    <Container id='services' as='section' maxW={'6xl'} py={12}>
      <Heading mb={6} textAlign={'center'}>
        Projects
      </Heading>
      <Swiper
        spaceBetween={20}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          968: {
            slidesPerView: 3,
          },
        }}
      >
        {projectList.map(({ node }, index: number) => (
          <SwiperSlide key={index}>
            <ProjectSlide node={node} index={index} />
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
