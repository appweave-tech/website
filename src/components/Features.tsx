'use client'

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import {ReactIcon } from './ReactIcon'
import { ReactElement } from 'react'
import React from 'react'
import { IndexPageFrontmatterType } from '../pages'
import { IconType } from 'react-icons'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

type ServiceType = NonNullable<IndexPageFrontmatterType>["services"]

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function Features(props: ServiceType) {
  return (
    <Container id="services" as="section" maxW={'6xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={100}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            {props?.tag}
          </Text>
          <Heading>{props?.title}</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            {props?.description}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            {
                props?.service?.map((item) => {
                    if (item) {
                    
                        return (<Feature key={item.title}
                        icon={<Icon as={ReactIcon} nameIcon={item.logo?.icon!} color={'yellow.500'} w={5} h={5} />}
                        iconBg={item.logo?.bgColor!}
                        text={item.title ?? ''}
                      />);
                    }
                    return <></>
                })
            }
            
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={props?.serviceImage!}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}