import { DiaryEntry } from "../types";
import { Entry } from "./Entry";
export const EntryList = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Diary entries</h2>
      <table>
        <tbody>
          {entries.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </tbody>
      </table>
    </>
  );
};
