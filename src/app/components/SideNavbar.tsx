"use client";
import { Box, VStack, Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links: { path: string; name: string }[] = [
    { path: "/", name: "Strona główna" },
    { path: "/miernik", name: "Miernik budżetowy" }
  ];

  return (
    <Box as="nav" position="fixed" minHeight="100vh" w="185px" borderRight="2px" borderColor="gray.300" p={4} boxShadow="sm">
      <VStack spacing={2} align="stretch">
        {links.map((link, idx) => (
          <StyledLink key={idx} path={link.path} pathname={pathname} name={link.name} />
        ))}
      </VStack>
    </Box>
  );
}

const StyledLink = ({ path, pathname, name }: { path: string; pathname: string; name: string }) => {
  const isActive = pathname === path;
  const activeBg = useColorModeValue("gray.500", "red.200");
  const activeColor = useColorModeValue("white", "gray.800");
  const inactiveBg = useColorModeValue("white", "gray.700");
  const inactiveColor = useColorModeValue("gray.900", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const hoverColor = useColorModeValue("blue.700", "blue.200");

  return (
    <NextLink href={path} passHref legacyBehavior>
      <ChakraLink
        px={4}
        py={2}
        borderWidth="1px"
        borderColor="gray.200"
        bg={isActive ? activeBg : inactiveBg}
        color={isActive ? activeColor : inactiveColor}
        fontSize="sm"
        fontWeight="medium"
        _hover={{
          bg: hoverBg,
          color: hoverColor,
          textDecoration: "none"
        }}
        _focus={{
          zIndex: 1,
          color: hoverColor,
          boxShadow: "outline"
        }}
        display="flex"
        alignItems="center"
      >
        {name}
      </ChakraLink>
    </NextLink>
  );
};
