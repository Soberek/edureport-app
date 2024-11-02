import axios from "axios";
import { useCallback, useState } from "react";

const API_URL: string = import.meta.env.VITE_API_URL;

interface TopicI {
  _id: string;
  id: string;
  content: string;
  lastUsed: string;
}

export const useTopicsGenerator = () => {
  const [topics, setTopics] = useState<TopicI[]>([]);
  const token = localStorage.getItem("token");

  const fetchTopics = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/generate_topics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        const data = response.data as TopicI[];
        setTopics(data);
      }
    } catch (err) {
      console.log(err);
      // setError(`Error fetching miernik items: ${err}`);
    } finally {
    }
  }, [token]);

  return { topics, fetchTopics };
};
