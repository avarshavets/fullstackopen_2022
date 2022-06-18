import React from "react";
import {OccupationalHealthcareEntry} from "../types";
import Diagnoses from "./Diagnoses";

const OccupationalHealthCare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({entry}) => {
    if (entry === undefined) {
        return null;
    }
    return (
        <>
            <div>{entry.date} -- <b>{entry.type}</b></div>
            <div><i>{entry.description}</i></div>
            {!entry.diagnosisCodes ? null : < Diagnoses diagnoseCodes={entry.diagnosisCodes as string[]}/>}

            <div>diagnose by {entry.employerName}</div>
            {entry.sickLeave && <p>sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.startDate}</p>}
        </>

    );
};

export default OccupationalHealthCare;