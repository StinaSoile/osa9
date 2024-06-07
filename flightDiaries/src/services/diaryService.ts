import diaryEntries from "../../data/diaries";

import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};
