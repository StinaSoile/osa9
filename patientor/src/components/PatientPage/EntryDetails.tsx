import { Entry, Diagnosis, EntryTypes } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const returnBase = () => {
    return (
      <>
        <p>
          {entry.date} <i>{entry.description}</i>
        </p>
        {entry.diagnosisCodes && (
          <ul>{entry.diagnosisCodes.map((code) => renderDiagnoses(code))}</ul>
        )}
      </>
    );
  };

  const renderDiagnoses = (code: string) => {
    const diag = diagnoses.find((d) => d.code === code);

    return (
      <li key={code}>
        {code} {diag?.name}
      </li>
    );
  };

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const switchEntries = () => {
    switch (entry.type) {
      case EntryTypes.Hospital:
        return (
          <>
            <p>
              discharge: {entry.discharge.date}, {entry.discharge.criteria}
            </p>
          </>
        );
      case EntryTypes.OccupationalHealthcare:
        return (
          <>
            <p>employer name: {entry.employerName}</p>
            {entry.sickLeave && (
              <p>
                sickleave: {entry.sickLeave.startDate} to{" "}
                {entry.sickLeave.endDate}
              </p>
            )}
          </>
        );
      case EntryTypes.HealthCheck: {
        switch (entry.healthCheckRating) {
          case 0: {
            return (
              <>
                <p>health check rating: Healthy</p>
              </>
            );
          }
          case 1: {
            return (
              <>
                <p>health check rating: Low risk</p>
              </>
            );
          }
          case 2: {
            return (
              <>
                <p>health check rating: High risk</p>
              </>
            );
          }
          case 3: {
            return (
              <>
                <p>health check rating: Critical risk</p>
              </>
            );
          }
          default: {
            return (
              <>
                <p>health check rating: {entry.healthCheckRating}</p>
              </>
            );
          }
        }
      }
      default:
        return assertNever(entry);
    }
  };

  return (
    <div
      style={{
        padding: "0.01em 16px",
        borderRadius: "16px",
        border: "1px solid #000000",
        margin: "6px",
      }}
    >
      {returnBase()}
      {switchEntries()}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default EntryDetails;
