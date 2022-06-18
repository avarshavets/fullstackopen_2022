import React from "react";
import {HospitalEntry} from "../types";
import Diagnoses from "./Diagnoses";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({entry}) => {
    if (entry === undefined) {
        return null;
    }
    return (
        <>
            <div>{entry.date} -- <b>{entry.type}</b></div>
            <div><i>{entry.description}</i></div>
            {!entry.diagnosisCodes ? null : < Diagnoses diagnoseCodes={entry.diagnosisCodes as string[]}/>}

            <div>diagnose by {entry.specialist}</div>
            <p>discharge:</p>
            <ul style={{ listStyleType: "none" }}>
                <li>{entry.discharge.date}</li>
                <li>{entry.discharge.criteria}</li>
            </ul>
        </>

    );
};

export default Hospital;