"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

/*
#212A31
#2E3944
#124E66
#748D92
#D3D9D4
*/
const theme = extendTheme({
  colors: {
    primary: {
      100: "#212A31"
    },
    secondary: {
      100: `#2E3944`
    },
    ternary: {
      100: `#124E66`
    },
    fourth: {
      100: `#748D92`
    },
    fifth: {
      100: `#D3D9D4`
    }
  }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
