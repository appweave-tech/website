import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { Container } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW={'6xl'} as='main' my={4}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
