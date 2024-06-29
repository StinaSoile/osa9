import { Patient, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import Entries from "./Entries";
// import EntryForm from "../AddEntryModal/EntryForm";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";

// import MaleIcon from "@mui/icons-material/Male";
// import FemaleIcon from "@mui/icons-material/Female";

const PatientInfo = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;

  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const fetchPatient = async (id: string | undefined) => {
    if (id) {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    }
  };
  useEffect(() => {
    void fetchPatient(id);
  }, [id]);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <div>sex: {patient?.gender}</div>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <AddEntryModal
        id={id}
        fetchPatient={fetchPatient}
        diagnoses={diagnoses}
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      {/* <EntryForm
        id={id}
        fetchPatient={fetchPatient}
        diagnoses={diagnoses}
        onCancel={closeModal}
      /> */}
      <Entries patient={patient} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientInfo;
