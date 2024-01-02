import * as React from 'react';
import { Container, Heading, VStack, Text } from '@chakra-ui/react';

type BlogProp = {
    image: string,
    title: string,
    blog: string,
}

const Blog = (props: BlogProp) => {
    return (
        <Container maxW={'6xl'} as="section" p="12">
            <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                <Heading as="h2">What we write about</Heading>
                <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam
                arcu, eu tempus tortor molestie at. Vestibulum pretium condimentum dignissim.
                Vestibulum ultrices vitae nisi sed imperdiet. Mauris quis erat consequat,
                commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
                </Text>
                <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam
                arcu, eu tempus tortor molestie at. Vestibulum pretium condimentum dignissim.
                Vestibulum ultrices vitae nisi sed imperdiet. Mauris quis erat consequat,
                commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
                </Text>
                <Text as="p" fontSize="lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam
                arcu, eu tempus tortor molestie at. Vestibulum pretium condimentum dignissim.
                Vestibulum ultrices vitae nisi sed imperdiet. Mauris quis erat consequat,
                commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
                Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
                </Text>
            </VStack>
        </Container>
    );
}

export default Blog;