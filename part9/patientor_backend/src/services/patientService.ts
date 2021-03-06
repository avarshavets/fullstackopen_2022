// import patientData from '../../data/patients.json'
import patients from "../../data/patients_expanded"
import {Patient, PatientWithoutSsn, NewPatient, NewEntry} from '../types'
import { v1 as uuid } from 'uuid'
// add types to JSON object that is imported from patients.json
// another way to get patient data is to create a separate .ts file with already typed patient data
// (see patientsTyped.ts),
// drawback of it - the file is used only by typescript and no other programs
// const patients: Array<Patient> = patientData

// Array<Patient> = Patient[]
const getPatients = (): Patient[] => {
    console.log(patients)
    return patients
}

const getPatientsWithoutSsn = (): Array<PatientWithoutSsn> => {
    return patients.map((p) => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation,
        entries: p.entries
    }))
}

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

const addPatient = (object: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...object,
    }
    patients.push(newPatient)
    return newPatient
}

const addEntry = (object: NewEntry, patientId: string): Patient => {
    const newEntry = {
        id: uuid(),
        ...object
    }

    const patientToUpdate = getPatientById(patientId)
    if (patientToUpdate) {
        patientToUpdate.entries.push(newEntry)
        return patientToUpdate
    }
    throw new Error('patient id not found')
}

export default {
    getPatients,
    getPatientById,
    addPatient,
    getPatientsWithoutSsn,
    addEntry
}