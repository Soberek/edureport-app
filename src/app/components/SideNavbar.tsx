"use client";
import { Box, VStack, Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links: { path: string; name: string }[] = [
    { path: "/", name: "Strona główna" },
    { path: "/miernik", name: "Miernik budżetowy (excel)" }
  ];

  return (
    <Box
      as="nav"
      display={{ base: "none", md: "block" }}
      position="fixed"
      minHeight="100vh"
      w={{ base: "0", md: "185px" }}
      borderRight="2px"
      borderColor="gray.300"
      p={4}
      boxShadow="sm"
    >
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
  const activeBg = useColorModeValue("", "");
  const activeColor = useColorModeValue("white", "primary.100");
  const inactiveBg = useColorModeValue("", "");
  const inactiveColor = useColorModeValue("gray.900", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const hoverColor = useColorModeValue("blue.700", "blue.200");

  return (
    <NextLink href={path} passHref legacyBehavior>
      <ChakraLink
        px={4}
        py={2}
        bg={isActive ? activeBg : inactiveBg}
        color={isActive ? activeColor : inactiveColor}
        textColor={isActive ? `primary.100` : `fourth.100`}
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
