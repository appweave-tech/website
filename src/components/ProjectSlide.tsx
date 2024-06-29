import React from 'react';
import {
  WrapItem,
  VStack,
  Text,
  Flex,
  Image,
  Heading,
  Link,
} from '@chakra-ui/react';
import { FaArrowRightLong } from 'react-icons/fa6';

// Slide component types:
type NodeType = {
  frontmatter: {
    title: string | null;
    description: string | null;
    image: string | null;
    slug: string | null;
  } | null;
};

export const ProjectSlide = ({
  node,
  index,
}: {
  node: NodeType;
  index: number;
}) => {
  return (
    <WrapItem
      key={index}
      justifyContent='space-between'
      flexDirection='column'
      color='black.300'
      bg='base.d100'
      rounded={5}
      flex={1}
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
            objectFit={'cover'}
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
