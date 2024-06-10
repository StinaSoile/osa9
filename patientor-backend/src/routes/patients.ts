import express from "express";
import patientService from "../services/patientService";
import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

// router.post("/", (_req, res) => {
//   res.send("Saving a diary!");
// });

router.post("/", (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService.addPatient(newDiaryEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errMsg = "Something went wrong.";
    if (error instanceof Error) {
      errMsg += " Error: " + error.message;
    }
    res.status(400).send(errMsg);
  }
});

export default router;

/*

9.12:
Create a POST endpoint /api/patients for adding patients. 
Ensure that you can add patients also from the frontend. 
You can create unique ids of type string using the uuid library:
import { v1 as uuid } from 'uuid'
const id = uuid()

9.13: Patientor backend, step6
Set up safe parsing, validation and type predicate 
to the POST /api/patients request.
Refactor the gender field to use an enum type.
*/
