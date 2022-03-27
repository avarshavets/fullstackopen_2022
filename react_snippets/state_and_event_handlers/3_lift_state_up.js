// https://fullstackopen.com/en/part1/component_state_event_handlers
// create a component to display the counter state passed as props

const Display = (props) => {
    return (
        <div>{props.counter}</div>
    )
}

// create a reusable component for the button with event handler functions passed as props
const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}

// --- Alternative compact presentation using destructering and arrow function
const Display1 = ({counter}) => (<div>{counter}</div>)
const Button1 = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)


// create a component with a counter state that is passed as props to children components
const App = () => {
    const [counter, setCounter] = useState(0);
    // create functions that will be run in the event handler
    const increaseByOne = () => setCounter(counter + 1)
    const setToZero = () => setCounter(0)

    return (
        <div>Counter:
            <Display1 counter = {counter}/>
            <Button1 onClick = {increaseByOne} text = "Add"/>
            <Button1 onClick={setToZero} text = "Reset"/>
        </div>
    )
}