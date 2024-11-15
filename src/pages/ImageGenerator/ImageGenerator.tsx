import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import CanvasTemplate from "./CanvasTemplate";

// Definiujemy typy dla właściwości komponentu CanvasWithBgImage

// Typ dla komponentu App, gdzie mamy stan obrazu i tablicę tytułów
const PostGenerator: React.FC = () => {
  const titles = [
    {
      id: 1,
      content: "Badanie wzroku"
    },
    {
      id: 49,
      content: "Tak"
    }
  ];
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <Box>
      <TextField type="file" onChange={handleFileChange} />
      {imageFile && (
        <Box>
          {titles.map((title, index) => (
            <CanvasTemplate key={index} imageId={title.id} bgImageFile={imageFile} title={title.content} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PostGenerator;
