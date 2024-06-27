import { Patient, Diagnosis } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}

const Entries = ({ patient, diagnoses }: Props) => {
  if (patient && patient.entries) {
    return (
      <>
        {patient.entries.length > 0 && (
          <>
            <h3>Entries</h3>
            {patient?.entries?.map((entry) => {
              return (
                <EntryDetails
                  key={entry.id}
                  entry={entry}
                  diagnoses={diagnoses}
                />
              );
            })}
          </>
        )}
      </>
    );
  } else return <></>;
};

export default Entries;
