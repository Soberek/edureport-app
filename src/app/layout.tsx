import type { Metadata } from "next";

import "./globals.css";
import NavLinks from "./components/nav-links";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "I hate my job",
  description: "Lets automate my job."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Box as="body" minHeight={`screen`} display="flex" flexDirection={"row"} bgColor={"gray.300"}> */}
      <ChakraProvider>
        <Container as={"body"} maxWidth="100vw" bg="gray.300">
          <Box display="flex">
            <NavLinks />
            <Box marginLeft={"185px"} flex={1} overflow={`hidden`}>
              {children}
            </Box>
          </Box>
        </Container>
      </ChakraProvider>
      {/* </Box> */}
    </html>
  );
}
