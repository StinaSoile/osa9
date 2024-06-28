import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewMedicalEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (_req, res) => {
  const id = _req.params.id;
  res.send(patientService.getPatient(id));
});

// router.post("/", (_req, res) => {
//   res.send("Saving a diary!");
// });

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errMsg = "Something went wrong.";
    if (error instanceof Error) {
      errMsg += " Error: " + error.message;
    }
    res.status(400).send(errMsg);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newMedicalEntry = toNewMedicalEntry(req.body);
    const addedEntry = patientService.addEntry(newMedicalEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errMsg = "something went wrong. ";
    if (error instanceof Error) {
      errMsg += "Error: " + error.message;
    }
    res.status(400).send(errMsg);
  }
});

export default router;
