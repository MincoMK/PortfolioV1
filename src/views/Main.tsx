import {
	Box,
	Flex,
	SimpleGrid,
	Heading
} from '@chakra-ui/react'
import React from 'react'
import Card from '../components/Card'

export default function Main() {
	return (
		<Flex
			w="100%"
			h="100%"
			align="center"
			justify="center"
		>
			<SimpleGrid columns={3} gap="25px">
				<Box />
				<Card
				    h={150}
				>
					<Heading
						fontSize="4xl"
						color="white"
					>Contact</Heading>
				</Card>
				<Box />

				<Card
				    h={150}
				></Card>
				<Card
				    h={210}
				>
					<Heading
						fontSize="4xl"
						color="white"
					>Minco</Heading>
				</Card>
				<Card
				    h={150}
				></Card>

				<Box />
				<Card
				    h={150}
				></Card>
				<Box />
			</SimpleGrid>
		</Flex>
	)
}
