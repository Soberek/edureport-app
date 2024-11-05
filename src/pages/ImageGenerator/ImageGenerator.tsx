import { useState, useRef } from "react";
import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
import html2canvas from "html2canvas";

// Predefiniowane kampanie
const defaultCampaigns = [
  {
    id: 1,
    title: "Regularne badania na obecność osteoporozy: Wsparcie dla zdrowych kości"
  },
  {
    id: 2,
    title: "Mammografia"
  },
  {
    id: 3,
    title: "Energetyki - szkodliwość"
  },
  {
    id: 4,
    title: "Zdrowie psychiczne a rozmowa: Dlaczego warto mówić?"
  },
  {
    id: 5,
    title: "Sztuka zarządzania stresem"
  }
] as const;

type Titles = (typeof defaultCampaigns)[number]["title"];

interface HealthCampaignTemplateProps {
  title: Titles;
  componentRef: React.Ref<HTMLDivElement>;
}

const HealthCampaignTemplate = ({ title, componentRef }: HealthCampaignTemplateProps) => {
  return (
    <Box ref={componentRef} sx={{ position: "relative", width: 800, height: 600, backgroundColor: "#F26419", padding: 3 }}>
      {/* Logo w lewym górnym rogu */}
      <Box
        sx={{
          position: "absolute",
          top: 4,
          left: 4,
          width: 80,
          height: 80,
          backgroundColor: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img src="/api/placeholder/80/80" alt="PSSE Logo" style={{ width: 64, height: 64, objectFit: "contain" }} />
      </Box>

      {/* Tytuł */}
      <Box sx={{ marginTop: 24, marginLeft: 4 }}>
        <Typography variant="h4" sx={{ color: "white", textTransform: "uppercase", maxWidth: 400, lineHeight: "1.25" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

const QuickCampaignGenerator = () => {
  const [campaigns] = useState(defaultCampaigns);
  const componentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [exportStatus, setExportStatus] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  // Eksport pojedynczej kampanii
  const exportSingleCampaign = async (campaign: (typeof defaultCampaigns)[number], index: number) => {
    if (!componentRefs.current[index]) return;

    try {
      const canvas = await html2canvas(componentRefs.current[index], {
        scale: 2,
        useCORS: true,
        backgroundColor: "#F26419"
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${campaign.title.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = image;
      link.click();
      return true;
    } catch (err) {
      console.error("Błąd podczas eksportu:", err);
      return false;
    }
  };

  // Eksport wszystkich kampanii
  const exportAllCampaigns = async () => {
    setIsExporting(true);
    setExportStatus("Rozpoczynam eksport...");

    for (let i = 0; i < campaigns.length; i++) {
      setExportStatus(`Eksportuję grafikę ${i + 1} z ${campaigns.length}...`);
      await exportSingleCampaign(campaigns[i], i);
      // Krótka przerwa między eksportami
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setExportStatus("Eksport zakończony!");
    setTimeout(() => {
      setExportStatus("");
      setIsExporting(false);
    }, 3000);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <AppBar position="sticky" sx={{ backgroundColor: "white", boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Generator Kampanii Profilaktycznych
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ color: isExporting ? "blue" : "green" }}>
              {exportStatus}
            </Typography>
            <Button onClick={exportAllCampaigns} disabled={isExporting} variant="contained" color="primary">
              {isExporting ? "Eksportuję..." : "Eksportuj wszystkie"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: 4 }}>
        {campaigns.map((campaign, index) => (
          <Box key={campaign.id} sx={{ borderRadius: "8px", padding: 2, backgroundColor: "white", boxShadow: 1, marginBottom: 3 }}>
            <HealthCampaignTemplate title={campaign.title} componentRef={(el) => (componentRefs.current[index] = el)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default QuickCampaignGenerator;
