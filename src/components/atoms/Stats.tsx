import { Stat as ChakraStat, StatLabel, StatNumber } from "@chakra-ui/react";

export const Stat = ({ label, value }: { label: string; value: number }) => (
  <ChakraStat minWidth={`200px`} maxWidth={{ base: `100%`, md: `25%` }}>
    <StatLabel>{label}:</StatLabel>
    <StatNumber>{value || 0}</StatNumber>
  </ChakraStat>
);
