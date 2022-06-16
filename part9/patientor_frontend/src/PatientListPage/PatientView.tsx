import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import { Patient } from "../types";
import { useEffect } from "react";
import {setIndividualPatient, useStateValue} from "../state";
// import {Typography } from "@material-ui/core";
// import FemaleIcon from '@mui/icons-material/Female';
// import MaleIcon from '@mui/icons-material/Male';


const PatientView = () => {
    // Note that in order to access the id in the url, you need to give useParams a proper type argument
    const patientId = useParams<{ id: string }>().id;
    const [{ individualPatient }, dispatch] = useStateValue();

    useEffect(() => {
        if (!individualPatient || patientId !== individualPatient.id) {
            void fetchIndividualPatient();
        }
    }, [dispatch]);

    const fetchIndividualPatient = async () => {
        try {
            // const {data: patientObj} = await axios.get<Patient>(
            //     `${apiBaseUrl}/patients/${patientId}`
            // );

            const patientObj = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${patientId as string}`
                ).then(res => res.data);

            // const patientObj: Patient = response.data;

            dispatch(setIndividualPatient(patientObj));
        } catch (e) {
            console.error(e);
        }
    };

    if (!individualPatient) {
        return null;
    }

    return (
        <div>
            <h2>{individualPatient.name}</h2>
            <div>ssn: {individualPatient.ssn}</div>
            <div>date of birth: {individualPatient.dateOfBirth}</div>
            <div>occupation: {individualPatient.occupation}</div>
        </div>
    );
};


export default PatientView;