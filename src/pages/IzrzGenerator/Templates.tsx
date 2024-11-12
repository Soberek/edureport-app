import { Box, List, ListItem, styled, Typography } from "@mui/material";
import { useTemplates } from "./useTemplates";

// Customize ListItem with styles
const StyledListItem = styled(ListItem)({
  padding: "10px 20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
  // Add other styles as needed
});

const TemplateList = () => {
  const { templates } = useTemplates();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ fontSize: 20 }}>Lista szablonów</Typography>
      <List>
        {templates.map((template, index) => (
          <StyledListItem key={index}>{template.name}</StyledListItem>
        ))}
      </List>
    </Box>
  );
};

export default TemplateList;
