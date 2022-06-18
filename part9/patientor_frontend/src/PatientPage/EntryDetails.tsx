import React from "react";
import {Entry} from "../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthCare from "./OccupationalHealthCare";

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry}/>;
        case "Hospital":
            return <Hospital entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthCare entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;

