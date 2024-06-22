import { useEffect, useState } from "react";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { Notification } from "./components/Notification";
import entryService from "./services/entries";
import { DiaryEntry, NotificationType } from "./types";
const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<NotificationType>({
    message: "",
    type: "notif",
  });

  useEffect(() => {
    console.log("use effect");

    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const entries = await entryService.getEntries();
    setEntries(entries);
  };
  return (
    <>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <EntryForm
        setNotification={setNotification}
        fetchEntries={fetchEntries}
      />
      <EntryList entries={entries} />
    </>
  );
};

export default App;

/*
9.16
Do all the required typing and ensure that there are no Eslint errors.

Exercise 9.17
Make it possible to add new diary entries from the frontend. 
In this exercise you may skip all validations and assume 
that the user just enters the data in a correct form.

Exercise 9.18
Notify the user if the the creation of a diary entry fails in the backend, 
show also the reason for the failure.

See eg. given link to see how you can narrow the Axios error
so that you can get hold of the error message.

ex9.19


Addition of a diary entry is now very error prone,
since user can type anything to the input fields. 
The situation must be improved.

Modify the input form so that the date is set with a 
HTML date input element, and the weather and visibility 
are set with HTML radio buttons. 
We have already used radio buttons in part 6, 
that material may or may not be useful...

Your app should all the time stay well typed and 
there should not be any Eslint errors and no Eslint rules should be ignored.
*/
