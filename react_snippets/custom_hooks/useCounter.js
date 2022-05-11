import { useState } from 'react'
const App = (props) => {
    const [counter, setCounter] = useState(0)

    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => setCounter(counter + 1)}>
                plus
            </button>
            <button onClick={() => setCounter(counter - 1)}>
                minus
            </button>
            <button onClick={() => setCounter(0)}>
                zero
            </button>
        </div>
    )
}

// --- Extracting counter logic into a custom hook --- //
const useCounter = () => {
    const [value, setValue] = useState(0)

    const increase = () => { setValue(value + 1) }

    const decrease = () => { setValue(value - 1) }

    const zero = () => { setValue(0) }

    return {
        value,
        increase,
        decrease,
        zero
    }
}

// --- App with a useCounter hook --- //
const App = (props) => {
    const counter = useCounter()

    return (
        <div>
            <div>{counter.value}</div>
            <button onClick={counter.increase}>
                plus
            </button>
            <button onClick={counter.decrease}>
                minus
            </button>
            <button onClick={counter.zero}>
                zero
            </button>
        </div>
    )
}