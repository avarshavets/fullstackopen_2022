import React from "react";
import {useStateValue} from "../state";

const Diagnoses: React.FC<{ diagnoseCodes: string[] }> = ({diagnoseCodes}) => {
    const [{ diagnoses }] = useStateValue();

    if (Object.entries(diagnoses).length === 0) {
        return null;
    }
    return (
        <>
            <p>diagnoses:</p>
            <ul>{diagnoseCodes.map((code, i) =>
                <li key={i}>{code}: {diagnoses[code].name}</li>
            )}
            </ul>
        </>

    );
};

export default Diagnoses;