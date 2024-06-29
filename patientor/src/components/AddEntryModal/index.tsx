import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import EntryForm from "./EntryForm";
import { Diagnosis } from "../../types";

interface Props {
  id: string | undefined;
  diagnoses: Diagnosis[];
  fetchPatient: (id: string | undefined) => Promise<void>;
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
}

const AddEntryModal = ({
  id,
  diagnoses,
  fetchPatient,
  modalOpen,
  onClose,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <EntryForm
        id={id}
        fetchPatient={fetchPatient}
        diagnoses={diagnoses}
        onCancel={onClose}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
