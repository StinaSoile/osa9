import { Patient, Diagnosis } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";

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

  const renderDiagnoses = (code: string) => {
    const diag = diagnoses.find((d) => d.code === code);

    return (
      <li key={code}>
        {code} {diag?.name}
      </li>
    );
  };

  return (
    <div>
      <h2>{patient?.name}</h2>
      <div>gender: {patient?.gender}</div>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <h3>Entries</h3>
      <div>
        {patient?.entries?.map((entry) => {
          return (
            <div key={entry.id}>
              {entry.date} <i>{entry.description}</i>
              <ul>
                {entry.diagnosisCodes?.map((code) => renderDiagnoses(code))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientInfo;
