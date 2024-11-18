import { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import { TemplateI } from "../../types/Template";

export const useTemplates = () => {
  const [templates, setTemplates] = useState<TemplateI[] | []>([]);
  const [chosenTemplate, setChosenTemplate] = useState<TemplateI | null>(null);

  useEffect(() => {
    const getTemplates = async () => {
      const data = await fetchData<TemplateI[]>("/api/templates");

      if (data && data.length > 0) {
        setTemplates(data);
        const izrzTemplate = data.find((template) => template.name === "izrz_template.docx");

        console.log(izrzTemplate);

        // select default template izrz
        if (izrzTemplate) {
          setChosenTemplate(izrzTemplate);
        }
      }
    };

    getTemplates();
  }, []);

  const handleTemplateSelect = (template: TemplateI) => {
    setChosenTemplate(template);
  };

  return { templates, chosenTemplate, handleTemplateSelect };
};
