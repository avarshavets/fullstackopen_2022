const App = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <div>Count: {counter}</div>

            {/* event handler must be a function or a ref of a function */}
            <button onClick={() => setCounter(counter + 1)}>Add</button>
            {/* adding a button to reset the counter */}
            <button onClick={() => setCounter(0)}>Reset</button>

        </div>
    )
}