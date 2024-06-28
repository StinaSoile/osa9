import patientEntries from "../../data/patients";
// import diagnosisData from "../../data/diagnoses";
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

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
  };
  const patient = patientEntries.find((p) => p.id === patientId);
  if (patient) {
    patient.entries.push(newEntry);
    return newEntry;
  }
  throw new Error("Patient not found");
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
