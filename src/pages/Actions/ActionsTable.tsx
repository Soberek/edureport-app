import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ActionI } from "../../types/Action";

export const ActionsTable = ({ data }: { data: ActionI[] | [] }) => {
  const columns: GridColDef[] = [
    {
      field: "actionName",
      headerName: "Nazwa akcji",
      // flex: 0.6
      // minWidth: 200,
      align: "center",
      headerAlign: "center"
    }
  ];

  const item_rows = data.map((item) => {
    return {
      id: item.name
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
        columnVisibilityModel={
          {
            // Hide program type in mobile view
            //   programType: !isMobile
          }
        }
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
};
