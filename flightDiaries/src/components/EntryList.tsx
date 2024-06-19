import { DiaryEntry } from "../types";
import { Entry } from "./Entry";
export const EntryList = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Diary entries</h2>
      <table>
        {entries.map((entry) => (
          <Entry entry={entry} />
        ))}
      </table>
    </>
  );
};
