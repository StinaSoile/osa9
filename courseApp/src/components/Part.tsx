import { CoursePart } from "../App";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            {"Project exercises "}
            {part.exerciseCount}
          </p>
        </>
      );
    case "group":
      return (
        <>
          {" "}
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            {"Project exercises "}
            {part.exerciseCount}
          </p>{" "}
          <p>
            {"Group projects "}
            {part.groupProjectCount}
          </p>
        </>
      );
    case "background":
      return (
        <>
          {" "}
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            {"Project exercises "}
            {part.exerciseCount}
          </p>
          <p>
            {"Submit to "}
            {part.backgroundMaterial}
          </p>
        </>
      );
    case "special":
      return (
        <>
          {" "}
          <p>
            <b>{part.name}</b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            {"Project exercises "}
            {part.exerciseCount}
          </p>
          <p>
            {"Required skills "}
            {part.requirements}
          </p>
        </>
      );
    default:
      return assertNever(part);
  }
};
