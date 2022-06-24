import {useParams} from "react-router-dom";
import React from "react";
import {Entry, Gender, Patient} from "../types";
import {updatePatient, useStateValue} from "../state";
import EntryDetails from "./EntryDetails";

import { Typography } from '@mui/material';
import {Button, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import AddEntryModal from "../AddEntryModal";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {EntryFormValues} from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
    // Note that in order to access the id in the url, you need to give useParams a proper type argument
    const {id} = useParams<{ id: string }>();
    // const id = useParams<{ id: string }>().id;

    const [{ patients }, dispatch ] = useStateValue();

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

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    if (!individualPatient) {
        return null;
    }

    const submitNewEntry = async (values: EntryFormValues) => {

        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${individualPatient.id}/entries`,
                values
            );
            dispatch(updatePatient(updatedPatient));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    return (
        <div>
            <Typography variant='h5' pt={5}>{individualPatient.name}{genderIcon(individualPatient.gender)}</Typography>
            <Typography component='span' variant='body2' pt={2}>
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

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};


export default PatientPage;