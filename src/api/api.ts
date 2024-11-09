import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

export interface Topic {
  _id: string;
  id: number;
  content: string;
}

// generic fetch function
export const fetchData = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const response = await axios.get<T>(`${API_URL}${endpoint}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Failed to fetch data from ${endpoint}: `, response.status);
      return null;
    }
  } catch (err) {
    console.error(`Error fetching data from ${endpoint}:`, err);
    return null;
  }
};

//  generic function for topics
export const fetchTopics = async (): Promise<Topic[] | null> => {
  return fetchData<Topic[]>("/api/topics");
};
