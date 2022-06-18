import {useParams} from "react-router-dom";
import React from "react";
import {Entry, Gender} from "../types";
import {useStateValue} from "../state";
import EntryDetails from "./EntryDetails";

import { Typography } from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const Index = () => {
    // Note that in order to access the id in the url, you need to give useParams a proper type argument
    const {id} = useParams<{ id: string }>();
    // const id = useParams<{ id: string }>().id;

    const [{ patients }] = useStateValue();

    const individualPatient = Object.values(patients).find(p => p.id === id);

    const genderIcon = (gender: Gender) => {
        switch (gender) {
            case "female":
                return <FemaleIcon />;
            case "male":
                return <MaleIcon />;
            case "other":
                return null;
            default:
                return null;
        }
    };

    if (!individualPatient) {
        return null;
    }

    return (
        <div>
            <Typography variant='h5' pt={5}>{individualPatient.name}{genderIcon(individualPatient.gender)}</Typography>
            <Typography variant='body2' pt={2}>
                <div>ssn: {individualPatient.ssn}</div>
                <div>date of birth: {individualPatient.dateOfBirth}</div>
                <div>occupation: {individualPatient.occupation}</div>
            </Typography>
            <Typography variant='subtitle1' pt={2}>entries</Typography>
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableBody>
                            {individualPatient.entries.map((entry: Entry, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <EntryDetails entry={entry}/>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

        </div>
    );
};


export default Index;