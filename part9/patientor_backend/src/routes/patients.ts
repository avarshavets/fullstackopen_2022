import express from 'express'
// patient services are just a collection of patient-related functions
// (not to confuse with services in frontend, e.g. blog services)
// all these functions could have been also written here inside api functions
import patientService from "../services/patientService";
// import { toNewPatientEntry } from '../utils';
import {NewEntry, NewPatient, Patient} from "../types";

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

// both body and params are typed
interface TypedRequest<T, U> extends Express.Request {
    params: T
    body: U
}

// alternative: leave req untyped but add toNewEntry function that parses and validates req body
patientRouter.post('/:id/entries',
    (req: TypedRequest<{id: string}, NewEntry>, res:express.Response<Patient|string> ) => {
    try {
        const newMedEntry = req.body
        const updatedPatient = patientService.addEntry(newMedEntry, req.params.id)
        res.json(updatedPatient)
    }
    catch (error: unknown) {
        res.status(400).send((error as Error).message)
    }
})

export default patientRouter

