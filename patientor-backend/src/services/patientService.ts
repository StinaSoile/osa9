import patientEntries from "../../data/patients";
import { v1 as uuid } from "uuid";
import { NonSensitivePatient, Patient, NewPatient } from "../types";

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

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();

  const newPatient = {
    id,
    ...entry,
  };
  patientEntries.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
