import { Patient, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import Entries from "./Entries";

// import MaleIcon from "@mui/icons-material/Male";
// import FemaleIcon from "@mui/icons-material/Female";

const PatientInfo = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    void fetchPatient(id);
  }, [id]);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <div>gender: {patient?.gender}</div>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>

      <Entries patient={patient} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientInfo;
