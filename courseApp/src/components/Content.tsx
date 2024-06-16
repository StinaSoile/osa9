import { Part } from "./Part";
import { CoursePart } from "../App";
type ContentProps = {
  courseParts: CoursePart[];
};

export const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};
