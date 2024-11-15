import { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import { TemplateI } from "../../types/Template";

export const useTemplates = () => {
  const [templates, setTemplates] = useState<TemplateI[] | []>([]);

  useEffect(() => {
    const getTemplates = async () => {
      const data = await fetchData<TemplateI[]>("/api/templates");

      if (data && data.length > 0) {
        setTemplates(data);
      }
    };

    getTemplates();
  }, []);

  return { templates };
};
