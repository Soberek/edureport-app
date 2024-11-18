import { Box, Button, List, ListItem, styled, Typography } from "@mui/material";
import { TemplateI } from "../../types/Template";
import BasicModal from "../../components/BasicModal/BasicModal";
import { useModal } from "../../components/BasicModal/useModal";

interface TemplateListPropsI {
  templates: TemplateI[];
  handleTemplateSelect: (template: TemplateI) => void;
  chosenTemplate: TemplateI | null;
}
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

const TemplateList = ({ templates, chosenTemplate, handleTemplateSelect }: TemplateListPropsI) => {
  const { open: isModalOpen, handleClose: handleModalClose, handleOpen: handleModalOpen } = useModal();

  if (chosenTemplate === null) {
    return <Box>Ładuje szablony...</Box>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ fontSize: 20 }}>Lista szablonów</Typography>

      <Button onClick={handleModalOpen} variant="contained" sx={{ my: 2 }}>
        Dodaj szablon
      </Button>

      <BasicModal open={isModalOpen} handleClose={handleModalClose}>
        Dodaj szablon
        <input
          type="file"
          alt="Dodaj plik"
          accept=".docx"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const singleFile = e.target?.files?.[0];

            if (!singleFile) return;
            if (singleFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
              console.log(singleFile);
              return;
            }

            if (singleFile.size > 5 * 1024 * 1024) {
              alert("Plik jest za duży! Maksymalny rozmiar to 5 MB.");
              return;
            }

            console.log(singleFile);

            // TODO: post template logic
          }}
        />
      </BasicModal>

      {chosenTemplate && <Box>Wybrany template: {chosenTemplate?.name}</Box>}
      <List>
        {templates.map((template, index) => (
          <StyledListItem key={index} onClick={() => handleTemplateSelect(template)}>
            {template.name}
          </StyledListItem>
        ))}
      </List>
    </Box>
  );
};

export default TemplateList;
