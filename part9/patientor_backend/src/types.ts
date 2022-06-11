// Enums are typically used when there is a set of predetermined values that are not expected to change in the future.
// Usually enums are used for much tighter unchanging values (for example, weekdays, months, cardinal directions)
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>

// patient without id field yet
export type NewPatient = Omit<Patient, 'id'>

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}