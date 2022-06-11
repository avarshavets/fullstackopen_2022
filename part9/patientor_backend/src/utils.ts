import { Gender, NewPatient } from "./types";

// the unknown type does not allow any operations, e.g.:
// accessing object.key, where object is unknown, is not possible
// we can fix this by destructuring the fields to variables of the type unknown
// alternatively - use type 'any' for the object and disable lint rule
type Field = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Field): NewPatient => {
    const newPatientEntry = {
        name: parseParamAsString('name', name),
        dateOfBirth: parseParamAsString('dateOfBirth', dateOfBirth),
        ssn: parseParamAsString('ssn', ssn),
        gender: parseGender(gender),
        occupation: parseParamAsString('occupation', occupation),
    }
    return newPatientEntry
}

// validation function for object field validation
// text is string = type guard function = boolean
const isString = (text: unknown) : text is string => {
    // it is rare but possible to create a string in the following way: const text = new String('...')
    return typeof text === 'string' || text instanceof String
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): boolean => {
    return Object.values(Gender).includes(param)
}

// parsers for each object field
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) throw new Error(`Incorrect or missing gender: ${gender}`)
    return gender as Gender
}

const parseParamAsString = (paramName: string, param: unknown): string => {
    if (!param || !isString(param)) throw new Error(`Incorrect or missing ${paramName}: ${param}`)
    return param
}