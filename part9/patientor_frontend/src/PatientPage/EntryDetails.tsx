import React from "react";
import {Entry} from "../types";
import {useStateValue} from "../state";

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
    const [{ diagnoses }] = useStateValue();

    if (entry === undefined || Object.entries(diagnoses).length === 0) {
        return null;
    }
    return (
        <>
            {entry.date} <i>{entry.description}</i>
            <ul>{entry.diagnosisCodes?.map(d =>
                <li key={d}>{d}: {diagnoses[d].name}</li>
            )}
            </ul>
        </>

    );
};

export default EntryDetails;

