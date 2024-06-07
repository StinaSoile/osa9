import patientEntries from "../../data/patients";

import { NonSensitivePatient } from "../types";

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

// const addDiary = () => {
//   return null;
// };

export default {
  getPatients,
};
