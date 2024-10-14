import type { Metadata } from "next";

import "./globals.css";
import NavLinks from "./components/SideNavbar";
import { Container, Box } from "@chakra-ui/react";
import { Providers } from "./providers";

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
      <body>
        <Providers>
          <Container maxWidth="100vw" textColor={`primary.100`} minHeight={`100vh`} bg="fifth.100" margin={0} padding={0}>
            <Box display="flex">
              <NavLinks />
              <Box marginLeft={{ base: "0", md: "185px" }} flex={1} overflow={`hidden`}>
                {children}
              </Box>
            </Box>
          </Container>
        </Providers>
      </body>

      {/* </Box> */}
    </html>
  );
}
