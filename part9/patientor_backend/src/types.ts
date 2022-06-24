// Enums are typically used when there is a set of predetermined values that are not expected to change in the future.
// Usually enums are used for much tighter unchanging values (for example, weekdays, months, cardinal directions)
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

interface BaseEntry {
    id: string;
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    specialist: string,
    discharge: {
        date: string,
        criteria: string
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;


export type NewEntry =
    | Omit<HospitalEntry, 'id'>
    | Omit<OccupationalHealthcareEntry, 'id'>
    | Omit<HealthCheckEntry, 'id'>;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export type PatientWithoutSsn = Omit<Patient, 'ssn' | 'entries'>

// patient without id field yet
export type NewPatient = Omit<Patient, 'id'>

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}