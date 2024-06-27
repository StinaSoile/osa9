import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error("Incorrect or missing field: " + string);
  }

  return string;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

// --------------------------------------------------

import { NewEntry, Diagnosis, HealthCheckRating, EntryTypes } from "./types";

const parseType = (
  type: unknown
):
  | EntryTypes.HealthCheck
  | EntryTypes.Hospital
  | EntryTypes.OccupationalHealthcare => {
  const entryType:
    | EntryTypes.HealthCheck
    | EntryTypes.Hospital
    | EntryTypes.OccupationalHealthcare
    | undefined = Object.values(EntryTypes).find((t) => t.toString() === type);
  if (entryType !== undefined) return entryType;
  throw new Error("Incorrect or missing entry type");
};

const parseDischarge = (
  d: unknown
): {
  date: string;
  criteria: string;
} => {
  if (!d || typeof d !== "object") {
    throw new Error("Incorrect or missing data in discharge information");
  }
  if ("date" in d && "criteria" in d) {
    return {
      date: parseDate(d.date),
      criteria: parseString(d.criteria),
    };
  }
  throw new Error("Incorrect or missing data in discharge information");
};

const parseRating = (rating: unknown): HealthCheckRating => {
  return 1;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseSickLeave = (
  s: unknown
): {
  startDate: string;
  endDate: string;
} => {
  return {
    startDate: "string",
    endDate: "string",
  };
};

export const toNewMedicalEntry = (object: NewEntry): NewEntry => {
  // if (!object || typeof object !== "object") {
  //   throw new Error("Incorrect or missing data");
  // }

  // if (
  //   "description" in object &&
  //   "date" in object &&
  //   "specialist" in object &&
  //   "type" in object
  // )
  {
    const entryType = parseType(object.type);
    switch (entryType) {
      case EntryTypes.Hospital: {
        if ("discharge" in object) {
          const newEntry: NewEntry = {
            type: entryType,
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            discharge: parseDischarge(object.discharge),
          };
          return newEntry;
        }
        throw new Error("Incorrect or missing data in discharge information");
      }
      case EntryTypes.HealthCheck: {
        if ("healthCheckRating" in object) {
          const newEntry: NewEntry = {
            type: entryType,
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            healthCheckRating: parseRating(object.healthCheckRating),
          };
          return newEntry;
        }
        throw new Error("Incorrect or missing health check rating");
      }
      case EntryTypes.OccupationalHealthcare: {
        if ("employerName" in object) {
          let newEntry: NewEntry;
          if ("sickLeave" in object) {
            newEntry = {
              type: entryType,
              description: parseString(object.description),
              date: parseDate(object.date),
              specialist: parseString(object.specialist),
              employerName: parseString(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave),
            };
          } else {
            newEntry = {
              type: entryType,
              description: parseString(object.description),
              date: parseDate(object.date),
              specialist: parseString(object.specialist),
              employerName: parseString(object.employerName),
            };
          }
          return newEntry;
        }
        throw new Error("Incorrect or missing employer name");
      }
      default:
        return assertNever(object);
    }

    // const newEntry: NewEntry = {
    //   type: "HealthCheck",
    //   description: parseString(object.description),
    //   date: parseDate(object.date),
    //   specialist: parseString(object.specialist),

    // };
  }

  throw new Error("Incorrect data: a field missing");
};
