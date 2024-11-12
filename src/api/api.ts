import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;

export interface Topic {
  _id: string;
  id: number;
  content: string;
}

// generic fetch function
export const fetchData = async <T>(endpoint: string): Promise<T | null> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get<T>(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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

export interface ProgramNameI {
  _id: string;
  type: "PROGRAMOWE" | "NIEPROGRAMOWE";
  name: string;
}

export const fetchProgramNames = async (): Promise<ProgramNameI[] | null> => {
  return fetchData<ProgramNameI[]>("/api/program_names");
};
