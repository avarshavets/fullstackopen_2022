// Timer

// setCounter is called in a setTimeout function.
// When setCounter is called and state is modified, React re-renders the component body
// (function body gets executed again!!!)
// ==> at this moment, setTimeout is run again
// ==> timer loop is created

import { useState} from "react";

const App = () => {
    const [counter, setCounter] = useState(0);

    // setTimeout runs a function ONCE after a set interval
    // setInterval runs a function REPEATEDLY with a set inverval
    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    console.log('rendering', counter)
    return (
        <div>{counter}</div>
    )
}
