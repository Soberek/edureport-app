import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import { MiernikItemI } from "../pages/MiernikApp";

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9)
// ];

export const BasicTable = React.memo(({ data }: { data: MiernikItemI[] }) => {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: { xs: 200, md: 650 },
          fontSize: { base: 5 }
        }}
        aria-label="Table"
      >
        <TableHead>
          <TableRow
            sx={{
              "& *": {
                py: 0.5
              }
            }}
          >
            <TableCell align="center">Nazwa</TableCell>
            <TableCell align="center">Typ</TableCell>
            <TableCell align="center" sx={{ display: { xs: "none" } }}>
              Data
            </TableCell>
            <TableCell align="center">Nazwa programu</TableCell>
            <TableCell align="center">Działanie</TableCell>
            <TableCell align="center">Liczba działań</TableCell>
            <TableCell align="center">Liczba odbiorców</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ overflowX: `scroll` }}>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& *": {
                  fontSize: { xs: 8, sm: 12, md: 12 },
                  py: 0.2,
                  px: 0.5
                }
              }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center" sx={{}}>
                {row.program_id.type}
              </TableCell>
              <TableCell align="center" sx={{ display: { xs: "none" } }}>
                {new Date(row.date).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">{row.program_id.name}</TableCell>
              <TableCell align="center">{row.action_id.name}</TableCell>
              <TableCell align="center">{row.action_count}</TableCell>
              <TableCell align="center">{row.people_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
