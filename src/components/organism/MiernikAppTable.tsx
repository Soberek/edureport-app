import { MiernikItemI } from "../../hooks/useMiernikApp";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";

export const MiernikAppTable = React.memo(({ data }: { data: MiernikItemI[] }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  console.log(isMobile);

  const columns: GridColDef[] = [
    {
      field: "programName",
      headerName: "Nazwa programu",
      // flex: 0.6
      minWidth: 200
    },
    {
      field: "programType",
      headerName: "Typ programu",
      // flex: 0.4
      flex: 0.5
    },
    {
      field: "date",
      headerName: "Data",
      type: "date",
      flex: 0.38
    },
    {
      field: "actionCount",
      headerName: "Działania",
      type: "number",
      flex: 0.35
    },
    {
      field: "peopleCount",
      headerName: "Odbiorcy",
      type: "number",
      flex: 0.3
    }
  ];

  const item_rows = data.map((item) => {
    return {
      id: item._id,
      programName: item.program_id.name,
      programType: item.program_id.type,
      peopleCount: item.people_count,
      actionCount: item.action_count,
      date: new Date(item.date)
    };
  });

  return (
    <Box
      sx={{
        height: { xs: 300, md: 500 },
        width: "100%",
        boxShadow: 10,
        backgroundColor: "white",
        borderRadius: "5px"
      }}
    >
      <DataGrid
        rows={item_rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        columnVisibilityModel={{
          // Hide program type in mobile view
          programType: !isMobile
        }}
        pageSizeOptions={[10]}
        checkboxSelection={window.innerWidth > 600}
        disableRowSelectionOnClick
        sx={{
          "& *": {
            fontSize: "0.9rem",
            textWrap: "wrap",
            p: 0,
            m: 0,
            alignContent: "start"
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "0.9rem" // Smaller header text
          }
        }}
      />
    </Box>
  );
});
