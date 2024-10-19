import { Box, VStack, Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

export default function SideNavbar() {
  const { pathname } = useLocation();

  const links: { path: string; name: string }[] = [
    { path: "/", name: "Strona główna" },
    { path: "/miernik-excel", name: "Miernik budżetowy (excel)" },
    { path: "/miernik-app", name: "Miernik budżetowy" }
  ];
  console.log(pathname);
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

  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const hoverColor = useColorModeValue("blue.700", "blue.200");

  return (
    <ChakraLink
      as={ReactRouterLink}
      to={path}
      px={4}
      py={2}
      textColor={isActive ? `primary.100` : `ternary.100`}
      fontSize="sm"
      textDecoration={isActive ? `underline` : ""}
      fontWeight="extrabold"
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
  );
};
