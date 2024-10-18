// pages/index.js
"use client";

import { Box, VStack, Heading, Text, Container, Flex } from "@chakra-ui/react";
import Button from "../Button";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <header>
        <title>Generator Sprawozdań OZiPZ</title>
        <meta name="description" content="Profesjonalny generator sprawozdań online" />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <Box as="header" bg="ternary.100" color="white" p={4}>
        <Heading as="h1" size="lg">
          Generator Sprawozdań
        </Heading>
      </Box>

      <Flex as="main" flex="1" alignItems="center" justifyContent="center">
        <Container textAlign="center">
          <VStack spacing={8}>
            <Heading as="h2" size="lg">
              Twórz profesjonalne sprawozdania w mgnieniu oka
            </Heading>
            <Text fontSize="xl">
              Nasz generator sprawozdań pomoże Ci szybko i łatwo przygotować wysokiej jakości raporty Oświaty Zdrowotnej i Promocji Zdrowia.
            </Text>
            <Link to="miernik-excel">
              <Button label={"Rozpocznij Teraz"} />
            </Link>
          </VStack>
        </Container>
      </Flex>

      <Box as="footer" bg="gray.100" p={4} textAlign="center">
        <Text>&copy; 2024 Generator Sprawozdań. Wszelkie prawa zastrzeżone.</Text>
      </Box>
    </Box>
  );
}
