'use client';
import React, { useState } from 'react';
import { ProjectPageType } from '../pages';
import { Container, Heading, Flex, IconButton } from '@chakra-ui/react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide, useSwiper } from 'swiper/react';
import { ProjectSlide } from './ProjectSlide';

// Types for SwiperNavButtons props
type SwiperNavButtonsProps = {
  isFirstSlide: boolean;
  isLastSlide: boolean;
};

const SwiperNavButtons: React.FC<SwiperNavButtonsProps> = ({
  isFirstSlide,
  isLastSlide,
}) => {
  const swiper = useSwiper();

  return (
    <Flex gap={4} justifyContent={'center'} mt={6}>
      <IconButton
        onClick={() => swiper.slidePrev()}
        isDisabled={isFirstSlide}
        size='fit-content'
        backgroundColor='transparent'
        _hover={{ backgroundColor: 'transparent' }}
        aria-label={'move left'}
        icon={<FaCircleChevronLeft size={30} />}
      />
      <IconButton
        onClick={() => swiper.slideNext()}
        isDisabled={isLastSlide}
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
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const updateSlideStates = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const projectList = edges;

  return (
    <Container id='services' as='section' maxW={'6xl'} py={12}>
      <Heading mb={6} textAlign={'center'}>
        Projects
      </Heading>
      <Swiper
        onActiveIndexChange={(swiper) => updateSlideStates(swiper)}
        onResize={(swiper) => updateSlideStates(swiper)}
        spaceBetween={20}
        breakpoints={{ 768: { slidesPerView: 2 }, 968: { slidesPerView: 3 } }}
      >
        {projectList.map(({ node }, index: number) => (
          <SwiperSlide key={index}>
            <ProjectSlide node={node} index={index} />
          </SwiperSlide>
        ))}
        <SwiperNavButtons isFirstSlide={isBeginning} isLastSlide={isEnd} />
      </Swiper>
    </Container>
  );
}
