import {useParams} from "react-router-dom";
import React from "react";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Patient, Entry} from "../types";
import {useEffect} from "react";
import {addPatient, useStateValue} from "../state";
import EntryDetails from "./EntryDetails";
// import {Typography } from "@material-ui/core";
// import FemaleIcon from '@mui/icons-material/Female';
// import MaleIcon from '@mui/icons-material/Male';


const Index = () => {
    // Note that in order to access the id in the url, you need to give useParams a proper type argument
    const {id} = useParams<{ id: string }>();
    // const id = useParams<{ id: string }>().id;

    const [{ patients }, dispatch] = useStateValue();
    const individualPatient = Object.values(patients).find(p => p.id === id);

    if (!individualPatient) {
        return null;
    }

    return (
        <div>
            <h2>{individualPatient.name}</h2>
            <div>ssn: {individualPatient.ssn}</div>
            <div>date of birth: {individualPatient.dateOfBirth}</div>
            <div>occupation: {individualPatient.occupation}</div>
            <h4>entries</h4>
            {individualPatient.entries.map((entry: Entry) => (
                <div key={entry.id}>
                    <EntryDetails entry={entry}/>
                </div>
            ))}
        </div>
    );
};


export default Index;