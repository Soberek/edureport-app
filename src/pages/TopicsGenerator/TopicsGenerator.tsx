import { Button, List, ListItem, Paper, Typography } from "@mui/material";
import { useTopicsGenerator } from "./useTopicsGenerator";
import SitesContainer from "../../components/SiteContainer/SiteContainer";
import SiteTitle from "../../components/SiteTitle/SiteTitle";

const TopicsGenerator = () => {
  const { topics, fetchTopics } = useTopicsGenerator();

  console.log(topics);

  return (
    <SitesContainer>
      <SiteTitle>Generator promptów</SiteTitle>
      <Paper sx={{ display: `flex`, p: 2, boxShadow: 10, flexDirection: `column`, fontSize: 12 }}>
        <Typography sx={{ fontWeight: `bold` }}>Wygeneruj posty twitter (max 250 znaków) na tematy (z emotkami minimum 2, max 4), każde z tytułem:</Typography>
        <List style={{ listStyleType: `circle` }}>{topics.length > 0 && topics.map((topic) => <ListItem key={topic._id}>{topic.content}</ListItem>)}</List>
        <Button sx={{ maxWidth: 300, fontSize: 10 }} variant="contained" onClick={() => fetchTopics()}>
          Generuj tematy/prompt do chatgpt
        </Button>
      </Paper>
    </SitesContainer>
  );
};

export default TopicsGenerator;
