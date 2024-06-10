export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// {
//   id: "d2773598-f723-11e9-8f0b-362b9e155667";
//   name: "Martin Riggs";
//   dateOfBirth: "1979-01-30";
//   ssn: "300179-77A";
//   gender: "male";
//   occupation: "Cop";
// }
export type NewPatient = Omit<Patient, "id">;
export type NonSensitivePatient = Omit<Patient, "ssn">;
