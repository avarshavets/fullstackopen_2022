import React from "react";
import {HealthCheckEntry} from "../types";
import Diagnoses from "./Diagnoses";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({entry}) => {
    if (entry === undefined) {
        return null;
    }
    return (
        <>
            <div>{entry.date} -- <b>{entry.type}</b></div>
            <div><i>{entry.description}</i></div>
            <div>health check rating: {entry.healthCheckRating}</div>
            {!entry.diagnosisCodes ? null : < Diagnoses diagnoseCodes={entry.diagnosisCodes as string[]}/>}
        </>

    );
};

export default HealthCheck;