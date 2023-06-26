import {
	Box,
	Flex,
	Heading,
    StyleProps
} from '@chakra-ui/react'
import React from 'react'

interface CardProps extends StyleProps {
	h: number
	children?: React.ReactNode
}

export default function Card(props: CardProps) {
	return (
		<Flex
			h="210px"
			w={210*((1+Math.sqrt(5))/2) + "px"}
			align="center"
			justify="center"
		>
			<Box
				w={props.h*((1+Math.sqrt(5))/2) + "px"}
				borderRadius={25}
				overflow="hidden"
				bg="linear-gradient(126deg, rgba(202,200,233,1) 15%, rgba(158,239,255,1) 100%)"
				opacity={0.9}
				p="15px"
				display="flex"
				alignItems="center"
				justifyContent="center"
				{...props}
			>
				{props.children}
			</Box>
		</Flex>
	)
}
