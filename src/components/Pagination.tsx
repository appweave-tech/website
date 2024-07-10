import React, { ReactNode } from 'react';
import { Container, Flex, FlexProps, useColorModeValue, Box } from '@chakra-ui/react';
import { Link } from 'gatsby';

interface PaginationContainerProps {
  currentPage: number;
  numPages: number;
}

const PaginationContainer: React.FC<PaginationContainerProps> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;

  return (
    <Container maxW="7xl" w="full" display="flex" alignItems="center" justifyContent="center" p={{ base: 5, sm: 10 }}>
      <Pagination currentPage={currentPage} numPages={numPages} prevPage={prevPage} nextPage={nextPage} isFirst={isFirst} isLast={isLast} />
    </Container>
  );
};

interface PaginationProps {
  currentPage: number;
  numPages: number;
  prevPage: string;
  nextPage: string;
  isFirst: boolean;
  isLast: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, numPages, prevPage, nextPage, isFirst, isLast }) => {
  return (
    <Flex as="nav" aria-label="Pagination" w="full" justifyContent="center" alignItems="center" mt={{ base: 3, md: 0 }}>
      {!isFirst && (
        <PaginationButton as={Link} to={prevPage} borderTopLeftRadius="md" borderBottomLeftRadius="md">
          Previous
        </PaginationButton>
      )}
      {Array.from({ length: numPages }, (_, i) => (
        <PaginationButton as={Link} to={`/blog/${i === 0 ? '' : i + 1}`} key={`pagination-number${i + 1}`} isActive={currentPage === i + 1}>
          {i + 1}
        </PaginationButton>
      ))}
      {!isLast && (
        <PaginationButton as={Link} to={nextPage} borderTopRightRadius="md" borderBottomRightRadius="md">
          Next
        </PaginationButton>
      )}
    </Flex>
  );
};

interface PaginationButtonProps extends FlexProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  to?: string; // Added `to` prop
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ children, isDisabled, isActive, to, ...props }) => {
  const activeStyle = {
    bg: useColorModeValue('gray.300', 'gray.700'),
  };

  return (
    <Box
      as={to ? Link : 'button'} // Conditional rendering based on `to` prop
      to={to} // Pass `to` prop to the Link component
      p={3}
      px={4}
      fontSize="md"
      fontWeight="500"
      lineHeight={0.8}
      opacity={isDisabled ? 0.7 : 1}
      mr="-1px"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Box>
  );
};

export default PaginationContainer;
