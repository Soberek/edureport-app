import { useState, useRef } from "react";
import { Box, Typography, Button, AppBar, Toolbar, TextField } from "@mui/material";
import html2canvas from "html2canvas";

// Predefiniowane kampanie
const defaultCampaigns = [
  {
    id: 1,
    title: "Regularne badania na obecność osteoporozy: Wsparcie dla zdrowych kości"
  },
  {
    id: 48,
    title: "Mammografia"
  },
  {
    id: 3,
    title: "Energetyki"
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
  imagePosition: { topPosition: number; leftPosition: number };
  id: number;
}

const HealthCampaignTemplate = ({ id, title, componentRef, imagePosition }: HealthCampaignTemplateProps) => {
  return (
    <Box
      ref={componentRef}
      sx={{
        position: "relative",
        // width: `100%`,
        maxWidth: "100%",
        height: "auto",
        backgroundImage: "url('/src/assets/Listopad.png')",
        // backgroundRepeat: "no-repeat",
        backgroundSize: `cover`,
        aspectRatio: "16/9",
        overflow: "hidden",
        padding: 3
      }}
    >
      <Box sx={{ marginTop: 14, marginLeft: 0 }}>
        <Typography variant="h4" sx={{ color: "white", textTransform: "uppercase", maxWidth: 400, lineHeight: "1.25" }}>
          {title}
        </Typography>

        {/* image container */}
        <Box
          position={`absolute`}
          sx={{
            top: imagePosition.topPosition,
            left: imagePosition.leftPosition,
            height: "81%",
            width: "50%",
            borderRadius: 3,
            backgroundColor: `red`,
            backgroundImage: `url('/src/assets/${id}.png')`,
            backgroundSize: "cover",
            transform: "translate(-50%, -50%"
          }}
        ></Box>
      </Box>
    </Box>
  );
};

const QuickCampaignGenerator = () => {
  const [campaigns] = useState(defaultCampaigns);
  const componentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [exportStatus, setExportStatus] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [imagePosition, setImagePosition] = useState({ topPosition: 49, leftPosition: 480 });
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

  const handleImagePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const name = e.target.name;

    console.log(value, name);
    if (isNaN(value) || value < 0) {
      setImagePosition((prevPosition) => {
        return { ...prevPosition, [name]: 0 };
      });

      return;
    }
    setImagePosition((prevPosition) => {
      return { ...prevPosition, [name]: value };
    });
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Export button */}
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

      {/* Image position */}
      <AppBar position="sticky" sx={{ backgroundColor: "white", boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <TextField
            type="number"
            required
            value={imagePosition.topPosition}
            label="Top position"
            name="topPosition"
            onChange={handleImagePositionChange}
          />
          <TextField
            type="number"
            required
            value={imagePosition.leftPosition}
            label="Left position"
            name="leftPosition"
            onChange={handleImagePositionChange}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: 4 }}>
        {campaigns.map((campaign, index) => (
          <Box
            key={campaign.id}
            sx={{ borderRadius: "8px", padding: 2, backgroundColor: "white", boxShadow: 1, marginBottom: 3 }}
          >
            <HealthCampaignTemplate
              imagePosition={imagePosition}
              title={campaign.title}
              id={campaign.id}
              componentRef={(el) => (componentRefs.current[index] = el)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default QuickCampaignGenerator;
