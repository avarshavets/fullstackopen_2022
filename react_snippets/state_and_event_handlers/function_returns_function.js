// Remember:
// event handlers must always be a function or a reference to a function. NOT a value!!!

// Function that returns a function

// Example 1: Event handlers that log "hello (customize input)" in the console
const App1 = () => {
    const hello = (who) => {
        const handler = () => {
            console.log('hello', who)
        }
        return handler
    }

    return (
        <div>
            {/*
            When the page loads hello(who) in the event handler is executed.
            hello(who) then returns a reference to a function with a specified parameter 'who'.
            When button is clicked the referenced function is executed.
            */}
            <button onClick={hello('world')}>button</button>
            <button onClick={hello('react')}>button</button>
            <button onClick={hello('function')}>button</button>
        </div>
    )
}

// Example 2: Event handlers that set the state of the component to a given value
const App2 = () => {
    const [value, setValue] = useState(10)

    const setToValue = (newValue) => () => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    return (
        <div>
            {/*
            setToValue() is also executed here when the page loads,
            a reference to an anonymous function with the captured input of setToValue()
            */}
            <button onClick={setToValue(1000)}>thousand</button>
            <button onClick={setToValue(0)}>reset</button>
            <button onClick={setToValue(value + 1)}>increment</button>
        </div>
    )
}

// Alternative solution to define event handler
const App = () => {
    const [value, setValue] = useState(10)

    const setToValue = (newValue) => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    return (
        <div>
            {/* event handler is an anonymous function that executed setValue() inside */}
            <button onClick={() => setToValue(1000)}>thousand</button>
            <button onClick={() => setToValue(0)}>reset</button>
            <button onClick={() => setToValue(value + 1)}>increment</button>
        </div>
    )
}

// Remember:
// onClick={setToValue(1000)} will cause an infinite recursion!
// Although, setToValue(1000) is a function call,
// it also triggers re-rendering of the component after the state update.
// Re-rendering in turn causes the execution of setToValue(1000) again --> re-rendering --> a loop
// Thus, onClick={() => setToValue(1000)}
