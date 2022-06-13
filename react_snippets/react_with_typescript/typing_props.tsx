const MyComp1 = () => {
    // TypeScript automatically infers the return type of this function
    // (i.e., a react component) as `JSX.Element`.
    return <div>TypeScript has auto inference!</div>
}

// @ts-ignore
const MyComp2 = (): JSX.Element => {
    // We are explicitly defining the return type of a function here
    // (i.e., a react component).
    return <div>TypeScript React is easy.</div>
}

interface MyProps {
    label: string;
    price?: number;
}

// @ts-ignore
const MyComp3 = ({ label, price }: MyProps): JSX.Element => {
    // We are explicitly defining the parameter types using interface `MyProps`
    // and return types as `JSX.Element` in this function (i.e., a react component).
    return <div>TypeScript is great.</div>
}

const MyComp4 = ({ label, price }: { label: string, price: number }) => {
    // We are explicitly defining the parameter types using an inline interface
    // and TypeScript automatically infers the return type as JSX.Element of the function (i.e., a react component).
    return <div>There is nothing like TypeScript.</div>
}