import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <header>
        <title>Generator Sprawozdań OZiPZ</title>
        <meta name="description" content="Profesjonalny generator sprawozdań online" />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <Box sx={{ backgroundColor: "primary.main", color: "white", padding: 2 }}>
        <Typography variant="h5">Generator Sprawozdań</Typography>
      </Box>

      <Box component="main" flex="1" display="flex" alignItems="center" justifyContent="center">
        <Container>
          <Stack spacing={4} textAlign="center">
            <Typography variant="h4">Twórz profesjonalne sprawozdania w mgnieniu oka</Typography>
            <Typography variant="h6">
              Nasz generator sprawozdań pomoże Ci szybko i łatwo przygotować wysokiej jakości raporty Oświaty Zdrowotnej
              i Promocji Zdrowia.
            </Typography>
            <Link to="miernik-excel" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Rozpocznij Teraz
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      <Box component="footer" sx={{ backgroundColor: "grey.300", padding: 2, textAlign: "center" }}>
        <Typography variant="body2">
          &copy; 2024 Generator Sprawozdań - Krzysztof Palpuchowski - Wszelkie prawa zastrzeżone.
        </Typography>
      </Box>
    </Box>
  );
}
