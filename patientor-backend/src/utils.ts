import {
  NewPatient,
  Gender,
  NewEntry,
  HealthCheckRating,
  EntryTypes,
  Diagnosis,
} from "./types";

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
    throw new Error("Incorrect or missing date: " + date);
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

// const parseType = (
//   type: unknown
// ):
//   | EntryTypes.HealthCheck
//   | EntryTypes.Hospital
//   | EntryTypes.OccupationalHealthcare => {
//   const entryType:
//     | EntryTypes.HealthCheck
//     | EntryTypes.Hospital
//     | EntryTypes.OccupationalHealthcare
//     | undefined = Object.values(EntryTypes).find((t) => t.toString() === type);
//   if (entryType !== undefined) return entryType;
//   throw new Error("Incorrect or missing entry type");
// };

const parseDischarge = (
  obj: object
): {
  date: string;
  criteria: string;
} => {
  if ("discharge" in obj) {
    if (
      obj.discharge &&
      typeof obj.discharge == "object" &&
      "date" in obj.discharge &&
      "criteria" in obj.discharge
    ) {
      return {
        date: parseDate(obj.discharge.date),
        criteria: parseString(obj.discharge.criteria),
      };
    }
  }

  throw new Error("Incorrect or missing data in discharge information");
};

const parseRating = (obj: object): HealthCheckRating => {
  if ("healthCheckRating" in obj) {
    if ([0, 1, 2, 3].includes(Number(obj.healthCheckRating)))
      return obj.healthCheckRating as HealthCheckRating;
  }
  throw new Error("Incorrect or missing health check rating");
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const parseSickLeave = (
  obj: object
): {
  startDate: string;
  endDate: string;
} => {
  if ("sickLeave" in obj) {
    if (
      obj.sickLeave &&
      typeof obj.sickLeave == "object" &&
      "startDate" in obj.sickLeave &&
      "endDate" in obj.sickLeave
    )
      return {
        startDate: parseDate(obj.sickLeave.startDate),
        endDate: parseDate(obj.sickLeave.endDate),
      };
  }
  throw new Error("Incorrect or missing data in sick leave information");
};

const parseEmployerName = (obj: object): string => {
  if ("employerName" in obj) return parseString(obj.employerName);
  throw new Error("Incorrect or missing employer name");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

// export const kanaEntry = (object: unknown) => {
//   if (!object || typeof object !== "object") {
//     throw new Error("Incorrect or missing data");
//   }
//   if (
//     !("description" in object) ||
//     !("date" in object) ||
//     !("specialist" in object) ||
//     !("type" in object)
//   ) {
//     throw new Error("Incorrect or missing data");
//   }
//   object;
// };

export const toNewMedicalEntry = (object: NewEntry): NewEntry => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }

  const common = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };
  let newEntry: NewEntry;
  switch (object.type) {
    case EntryTypes.Hospital: {
      newEntry = {
        ...common,
        type: EntryTypes.Hospital,
        discharge: parseDischarge(object),
      };
      break;
    }

    case EntryTypes.HealthCheck: {
      newEntry = {
        ...common,
        type: EntryTypes.HealthCheck,
        healthCheckRating: parseRating(object),
      };
      break;
    }
    case EntryTypes.OccupationalHealthcare: {
      newEntry = {
        ...common,
        type: EntryTypes.OccupationalHealthcare,
        employerName: parseEmployerName(object),
      };
      if ("sickLeave" in object) {
        newEntry = {
          ...newEntry,
          sickLeave: parseSickLeave(object),
        };
      }
      break;
    }
    default:
      return assertNever(object);
  }
  return newEntry;
};
