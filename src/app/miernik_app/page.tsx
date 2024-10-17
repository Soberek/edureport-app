"use client";

import { MiernikProgramTypeValue } from "@/app/models/MiernikType";
import { Button } from "@chakra-ui/react";
import React from "react";

// Typ do użycia w innych częściach aplikacji (bez właściwości Document)
export type MiernikProgramType = {
  name: MiernikProgramTypeValue;
};

const MiernikApp = () => {
  // const [miernik_item, setMiernikItem] = useState()

  // get miernik items
  const addProgramType = async () => {
    const new_program: MiernikProgramType = {
      name: "NIEPROGRAMOWE"
    };

    const response = await fetch("api/miernik_types", {
      method: "POST",
      body: JSON.stringify(new_program),
      headers: { Content_type: "application/json" }
    });

    console.log(response);

    const data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <Button onClick={() => addProgramType()} variant={`outline`}>
        Add ProgramType
      </Button>
    </div>
  );
};

export default MiernikApp;
