import { useEffect, useState } from "react";
import { fetchData } from "../../api/api";

interface TemplateI {
  _id: string;
  file: Blob;
  name: string;
}

const Templates = () => {
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

  return <div>{templates.length && templates.map((template) => <div>{template.name}</div>)}</div>;
};

export default Templates;
