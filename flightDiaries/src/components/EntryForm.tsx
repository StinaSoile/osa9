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
      const newEntry: NewDiaryEntry = {
        date,
        visibility: parseVisibility(visibility),
        weather: parseWeather(weather),
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

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleCreateEntry}>
        <div>
          Date:
          <input
            data-testid="date"
            type="date"
            placeholder="date"
            value={date}
            name="Date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        Visibility:
        <div>
          great
          <input
            type="radio"
            checked={visibility === Visibility.Great}
            name="Visibility"
            onChange={() => setVisibility(Visibility.Great)}
          />{" "}
          good
          <input
            type="radio"
            checked={visibility === Visibility.Good}
            name="Visibility"
            onChange={() => setVisibility(Visibility.Good)}
          />{" "}
          ok
          <input
            type="radio"
            checked={visibility === Visibility.Ok}
            name="Visibility"
            onChange={() => setVisibility(Visibility.Ok)}
          />{" "}
          poor
          <input
            type="radio"
            checked={visibility === Visibility.Poor}
            name="Visibility"
            onChange={() => setVisibility(Visibility.Poor)}
          />{" "}
        </div>
        Weather:
        <div>
          sunny
          <input
            type="radio"
            checked={weather === Weather.Sunny}
            name="Weather"
            onChange={() => setWeather(Weather.Sunny)}
          />{" "}
          rainy
          <input
            type="radio"
            checked={weather === Weather.Rainy}
            name="Weather"
            onChange={() => setWeather(Weather.Rainy)}
          />{" "}
          cloudy
          <input
            type="radio"
            checked={weather === Weather.Cloudy}
            name="Weather"
            onChange={() => setWeather(Weather.Cloudy)}
          />{" "}
          stormy
          <input
            type="radio"
            checked={weather === Weather.Stormy}
            name="Weather"
            onChange={() => setWeather(Weather.Stormy)}
          />{" "}
          windy
          <input
            type="radio"
            checked={weather === Weather.Windy}
            name="Weather"
            onChange={() => setWeather(Weather.Windy)}
          />{" "}
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
