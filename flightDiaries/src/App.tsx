import { useEffect, useState } from "react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import entryService from "./services/entries";
import { DiaryEntry } from "./types";
const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    console.log("use effect");
    const fetchEntries = async () => {
      const entries = await entryService.getEntries();
      setEntries(entries);
    };
    fetchEntries();
  }, []);
  return (
    <>
      <EntryForm />
      <EntryList entries={entries} />
    </>
  );
};

export default App;
