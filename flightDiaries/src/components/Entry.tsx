import { DiaryEntry } from "../types";

export const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <tr>
      <td>
        {/* <ul style="list-style-type:none;"> */}
        <ul>
          <li>
            <b>{entry.date}</b>
          </li>
          <li>{entry.visibility}</li>
          <li>{entry.weather}</li>
        </ul>
      </td>
    </tr>
  );
};
