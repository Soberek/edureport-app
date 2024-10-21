import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export const Stats = ({ label, value }: { label: string; value: number }) => (
  <Stat minWidth={`200px`} maxWidth={{ base: `100%`, md: `25%` }}>
    <StatLabel>{label}:</StatLabel>
    <StatNumber>{value || 0}</StatNumber>
  </Stat>
);
