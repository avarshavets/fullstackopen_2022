import React from "react";
import {Entry, EntryType} from "../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthCare from "./OccupationalHealthCare";
import {assertNever} from "../utils";

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}): JSX.Element => {
    switch (entry.type) {
        case EntryType.HealthCheck:
            return <HealthCheck entry={entry}/>;
        case EntryType.Hospital:
            return <Hospital entry={entry}/>;
        case EntryType.OccupationalHealthcare:
            return <OccupationalHealthCare entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;

