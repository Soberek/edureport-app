import React from "react";
import { IconType } from "react-icons";
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface ButtonI extends ChakraButtonProps {
  key?: string | number;
  selected?: boolean; // Optional: default to false for simple usage
  label: string | number; // Button label
  onClick?: () => void; // Optional: default no-op function
  Icon?: IconType; // Icon component from react-icons
}

const Button = ({ selected = false, label = "", onClick = () => {}, Icon, ...rest }: ButtonI) => {
  // Conditional styles based on the `selected` state

  const bgColor = selected ? `primary.100` : `ternary.100`;
  const textColor = selected ? "white" : "white";

  return (
    <ChakraButton
      leftIcon={Icon && <Icon size={23} />}
      bg={bgColor}
      color={textColor}
      _hover={{ border: 2, transform: "translateY(-4  px)" }}
      px={4}
      py={2}
      rounded={5}
      fontWeight="bold"
      onClick={onClick}
      transition="all 0.3s ease"
      display="flex"
      alignItems="center"
      gap={2}
      {...rest} // Pass down any additional Chakra Button props
    >
      {label}
    </ChakraButton>
  );
};

export default Button;
