import axios from "axios";
import patientService from "../../services/patients";
import {
  Diagnosis,
  EntryTypes,
  // HealthCheckEntry,
  NewEntry,
} from "../../types";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const EntryForm = ({
  id,
  diagnoses,
  fetchPatient,
  onCancel,
  setModalOpen,
}: {
  id: string | undefined;
  diagnoses: Diagnosis[];
  fetchPatient: (id: string | undefined) => Promise<void>;
  onCancel: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [error, setError] = useState<string>();
  const [codes, setCodes] = useState<Array<Diagnosis["code"]>>([]);

  const [entry, setEntry] = useState("");
  // entry specific values:
  const [rating, setRating] = useState("");
  const [disDate, setDisDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [employerName, setEmployerName] = useState("");

  const handleCodes = (arr: string[]) => {
    // const arr: Array<Diagnosis["code"]> = value.split(",");
    setCodes(arr);

    console.log(arr);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (id) {
      try {
        let newEntry: NewEntry;
        switch (entry) {
          case "HealthCheck": {
            let nmbRating = -1;
            if (rating !== "") {
              nmbRating = Number(rating);
            }
            newEntry = {
              type: EntryTypes.HealthCheck,
              description,
              date,
              specialist,
              diagnosisCodes: codes,
              healthCheckRating: nmbRating,
            };
            break;
          }
          case "Hospital": {
            newEntry = {
              type: EntryTypes.Hospital,
              description,
              date,
              specialist,
              diagnosisCodes: codes,
              discharge: {
                date: disDate,
                criteria,
              },
            };
            break;
          }
          case "OccupationalHealthcare": {
            if (sickLeaveStartDate === "" && sickLeaveEndDate === "") {
              newEntry = {
                type: EntryTypes.OccupationalHealthcare,
                description,
                date,
                specialist,
                diagnosisCodes: codes,
                employerName,
              };
            } else
              newEntry = {
                type: EntryTypes.OccupationalHealthcare,
                description,
                date,
                specialist,
                diagnosisCodes: codes,
                sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                },
                employerName,
              };
            break;
          }
          default:
            throw new Error("Entry type is not chosen");
        }
        await patientService.createEntry(newEntry, id);
        setDescription("");
        setDate("");
        setDisDate("");
        setSpecialist("");
        setRating("");
        setCodes([]);
        setError(undefined);
        fetchPatient(id);
        setCriteria("");
        setSickLeaveStartDate("");
        setSickLeaveEndDate("");
        setEmployerName("");
        setModalOpen(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data;
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else if (e instanceof Error) {
          setError(e.message);
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
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel required id="demo-row-radio-buttons-group-label">
              Entry type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            >
              <FormControlLabel
                value="HealthCheck"
                control={<Radio />}
                label="Health check"
              />
              <FormControlLabel
                value="Hospital"
                control={<Radio />}
                label="Hospital"
              />
              <FormControlLabel
                value="OccupationalHealthcare"
                control={<Radio />}
                label="Occupational healthcare"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            required
            label="Description"
            variant="standard"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Date"
            variant="standard"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            fullWidth
            required
            label="Specialist"
            variant="standard"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />

          <Autocomplete
            value={codes}
            onChange={(
              _event: React.SyntheticEvent<Element, Event>,
              values: string[]
            ) => handleCodes(values)}
            multiple
            options={diagnoses.map((d) => d.code)}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={option}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Diagnosis codes"
              />
            )}
          />

          {entry === "HealthCheck" && (
            <FormControl fullWidth>
              <InputLabel required id="rating">
                Health check rating
              </InputLabel>
              <Select
                labelId="rating"
                value={rating}
                label="Health check rating"
                variant="standard"
                onChange={({ target }) => setRating(target.value)}
              >
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>LowRisk</MenuItem>
                <MenuItem value={2}>HighRisk</MenuItem>
                <MenuItem value={3}>CriticalRisk</MenuItem>
              </Select>
            </FormControl>
          )}

          {entry === "Hospital" && (
            <>
              <TextField
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Discharge date"
                variant="standard"
                value={disDate}
                onChange={({ target }) => setDisDate(target.value)}
              />
              <TextField
                fullWidth
                required
                label="Discharge criteria"
                variant="standard"
                value={criteria}
                onChange={({ target }) => setCriteria(target.value)}
              />
            </>
          )}
          {entry === "OccupationalHealthcare" && (
            <div>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Sick leave starting date"
                variant="standard"
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Sick leave ending date"
                variant="standard"
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
              <TextField
                fullWidth
                required
                label="employer name"
                variant="standard"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </div>
          )}

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" color="secondary" onClick={onCancel}>
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Stack>
      </form>
    </div>
  );
};

export default EntryForm;
