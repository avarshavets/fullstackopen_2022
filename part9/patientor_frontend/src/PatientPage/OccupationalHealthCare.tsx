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
            {!entry.diagnosisCodes ? null : < Diagnoses diagnoseCodes={entry.diagnosisCodes}/>}

            <div>diagnose by {entry.specialist}</div>
            <div>employer: {entry.employerName}</div>
            {(entry.sickLeave?.startDate && entry.sickLeave?.endDate) &&
            <div>
                sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.startDate}
            </div>}
        </>

    );
};

export default OccupationalHealthCare;