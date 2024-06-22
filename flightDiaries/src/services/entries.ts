import axios from "axios";
import { NewDiaryEntry, DiaryEntry } from "../types";

const getEntries = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/diaries");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log(error);
  }
};

// const createEntry = (entry: NewDiaryEntry) => {
//   const response = axios
//     .post<DiaryEntry>("http://localhost:3000/api/diaries", entry)
//     .then((result) => {
//       console.log("result");
//       return result;
//     })
//     .catch((error) => {
//       console.log(error.response.data);
//     });

//   return response;
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createEntry = async (entry: any) => {
  const response = await axios.post<DiaryEntry>(
    "http://localhost:3000/api/diaries",
    entry
  );
  return response;

  // try {
  //   const response = await axios.post<DiaryEntry>(
  //     "http://localhost:3000/api/diaries",
  //     entry
  //   );
  //   console.log("Vastaus: " + response);
  //   return response;
  // } catch (error) {
  //   console.log("Ollaan entryservicen catchissa", error);
  //   if (axios.isAxiosError(error)) {
  //     console.log(error?.response?.data);
  //     throw error;
  //   }
  //   console.log("Some other error", error);
  // }
};

export default {
  getEntries,
  createEntry,
};
