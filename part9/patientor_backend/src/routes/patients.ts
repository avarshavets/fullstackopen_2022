import express from 'express'
// patient services are just a collection of patient-related functions
// (not to confuse with services in frontend, e.g. blog services)
// all these functions could have been also written here inside api functions
import patientService from "../services/patientService";
// import { toNewPatientEntry } from '../utils';
import {NewPatient, Patient} from "../types";

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSsn())
})

patientRouter.get('/:id', (req, res:express.Response<Patient|string>) => {
    const patient = patientService.getPatientById(req.params.id)
    return patient ? res.status(200).json(patient) : res.status(400).send("patient id not found")
})

// alternative to parsing and validating every filed of the request's body object,
// add type to the request (if any field will fail to match the type --> a quiet error occur)
patientRouter.post('/', (req:express.Request<NewPatient>, res) => {
    try {
        // const newPatient = toNewPatientEntry(req.body)
        const newPatient = req.body
        const addedPatient = patientService.addPatient(newPatient)
        res.json(addedPatient)
    }
    catch (error: unknown) {
        res.status(400).send((error as Error).message)
    }
})

export default patientRouter

