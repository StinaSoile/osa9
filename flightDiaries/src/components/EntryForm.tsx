import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import axios from "axios";

import { Weather, Visibility, NewDiaryEntry, NotificationType } from "../types";
import entryService from "../services/entries";

type NotificationProps = {
  setNotification: Dispatch<SetStateAction<NotificationType>>;
  fetchEntries: () => Promise<void>;
};

export const EntryForm = (props: NotificationProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleCreateEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = {
        date,
        visibility,
        weather,
        comment,
      };

      await entryService.createEntry(newEntry);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        props.setNotification({
          message: error?.response?.data,
          type: "error",
        });
      } else console.log(error);
      return;
    }
    props.setNotification({
      message: "Entry added succesfully",
      type: "notif",
    });
    setDate("");
    setComment("");
    setVisibility("");
    setWeather("");
    props.fetchEntries();
  };

  const isWeather = (param: string): param is Weather => {
    return Object.values(Weather)
      .map((v) => v.toString())
      .includes(param);
  };

  const parseWeather = (weather: string): Weather => {
    if (!weather || !isWeather(weather)) {
      throw new Error("Incorrect or missing weather: " + weather);
    }
    return weather;
  };

  const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility)
      .map((v) => v.toString())
      .includes(param);
  };

  const parseVisibility = (visibility: string): Visibility => {
    if (!visibility || !isVisibility(visibility)) {
      throw new Error("Incorrect or missing visibility: " + visibility);
    }
    return visibility;
  };

  // const isDate = (date: string): boolean => {
  //   return Boolean(Date.parse(date));
  // };

  // const parseDate = (date: string): string => {
  //   if (!date || !isDate(date)) {
  //     throw new Error("Incorrect or missing date: " + date);
  //   }
  //   return date;
  // };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleCreateEntry}>
        <div>
          Date:
          <input
            data-testid="date"
            type="text"
            placeholder="date"
            value={date}
            name="Date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label>
            Visibility:
            <input
              data-testid="visibility"
              type="text"
              placeholder="visibility"
              value={visibility}
              name="Visibility"
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
        </div>
        <div>
          Weather:
          <input
            data-testid="weather"
            type="text"
            placeholder="weather"
            value={weather}
            name="Weather"
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          Comment:
          <input
            data-testid="comment"
            type="text"
            placeholder="comment"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button data-testid="createbutton" type="submit">
          add
        </button>
      </form>
    </>
  );
};
