import axios from "axios";
import patientService from "../../services/patients";
import {
  Diagnosis,
  EntryTypes,
  // HealthCheckEntry,
  NewEntry,
} from "../../types";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const EntryForm = ({ id }: { id: string | undefined }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [error, setError] = useState<string>();
  const [rating, setRating] = useState("");
  const [codes, setCodes] = useState<Array<Diagnosis["code"]>>([]);
  const handleCodes = (value: string) => {
    const arr: Array<Diagnosis["code"]> = value.split(",");
    setCodes(arr);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: EntryTypes.HealthCheck,
      description,
      date,
      specialist,
      diagnosisCodes: codes,
      healthCheckRating: Number(rating),
    };
    if (id) {
      try {
        await patientService.createEntry(newEntry, id);
        setDescription("");
        setDate("");
        setSpecialist("");
        setRating("");
        setCodes([]);
        setError(undefined);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data;
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
    return;
  };
  return (
    <div>
      <h3>New entry</h3>
      {error && <Alert severity="error">{error}</Alert>}

      <form
        style={{
          padding: "1em 16px",
          borderRadius: "16px",
          border: "1px solid #000000",
          margin: "6px",
        }}
        onSubmit={handleSubmit}
      >
        <h4>New health check entry</h4>
        <div>
          Description
          <input
            name="description"
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          Date
          <input name="date" onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          Specialist
          <input
            name="specialist"
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <div>
          Health check rating
          <input
            name="healthcheckrating"
            onChange={({ target }) => setRating(target.value)}
          />
        </div>
        <div>
          Diagnosis codes
          <input
            name="diagnosiscodes"
            onChange={(event) => handleCodes(event.target.value)}
          />
        </div>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default EntryForm;
