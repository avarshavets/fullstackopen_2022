import patientData from '../../data/patients.json'
import { Patient, PatientWithoutSsn, NewPatient } from '../types'
import { v1 as uuid } from 'uuid'
// add types to JSON object that is imported from patients.json
// another way to get patient data is to create a separate .ts file with already typed patient data
// (see patientsTyped.ts),
// drawback of it - the file is used only by typescript and no other programs
const patients: Array<Patient> = patientData

// Array<Patient> = Patient[]
const getPatients = (): Patient[] => {
    return patients
}

const getPatientsWithoutSsn = (): Array<PatientWithoutSsn> => {
    return patients.map((p) => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation
    }))
}

const addPatient = (object: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...object
    }
    patients.push(newPatient)
    return newPatient
}

export default {
    getPatients,
    addPatient,
    getPatientsWithoutSsn
}