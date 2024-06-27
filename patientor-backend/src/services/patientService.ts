import patientEntries from "../../data/patients";
import { v1 as uuid } from "uuid";
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types";
// import diagnosisData from "../../data/diagnoses";

const getPatients = (): NonSensitivePatient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patientEntries.find((patient) => patient.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...entry,
  };
  patientEntries.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };
  // diagnosisData.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
