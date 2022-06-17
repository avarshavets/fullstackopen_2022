import React from "react";
import {Entry} from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({entry}) => {
    if (entry === undefined) {
        return null;
    }
    return (
        <>
            {entry.date} <i>{entry.description}</i>
            <ul>{entry.diagnosisCodes?.map(d => <li key={d}>{d}</li>)}</ul>
        </>

    );
};

export default EntryDetails;

