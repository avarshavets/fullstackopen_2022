import React from 'react'

interface PartBase {
    name: string,
    exerciseCount: number,
    type: string
}

interface PartBaseWithDescription extends PartBase {
    description: string
}

interface PartNormal extends PartBaseWithDescription {
    type: "normal";
}

interface PartProject extends PartBase {
    type: "groupProject",
    groupProjectCount: number
}

interface PartSubmission extends PartBaseWithDescription {
    type: "submission",
    exerciseSubmissionLink: string
}

interface PartWithRequirements extends PartBaseWithDescription {
    type: "special",
    requirements: Array<string>
}

export type Part = PartNormal | PartProject | PartSubmission | PartWithRequirements


// Helper function for exhaustive type checking: returns a part that is never in the type list
const assertNever = (value: never): never => {
    throw new Error(`${JSON.stringify(value)} does not belong to any declared type`)
}

const CoursePart = ({ part }: { part: Part }) : JSX.Element => {
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                </div>
            )
        case 'groupProject':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div>project exercises {part.groupProjectCount}</div>
                </div>
            )
        case 'submission':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <div>submit to {part.exerciseSubmissionLink}</div>
                </div>
            )
        case 'special':
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <div>required skills: {part.requirements.join(", ")}</div>
                </div>
            )
        default:
            return assertNever(part)
    }
}

export default CoursePart