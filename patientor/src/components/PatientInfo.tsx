import { Patient } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";

// import MaleIcon from "@mui/icons-material/Male";
// import FemaleIcon from "@mui/icons-material/Female";

const PatientInfo = () => {
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

  // const patient = patients.find((patient) => patient.id === id);
  return (
    <div>
      <h2>{patient?.name}</h2>
      <div>gender: {patient?.gender}</div>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
    </div>
  );
};

export default PatientInfo;
