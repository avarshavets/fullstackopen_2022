const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    // piece of state as an array of all clicks occurred -->
    // every click is stored into a separate piece of state allClicks
    const [allClicks, setAllClicks] = useState([])

    const handleLeftClick = () => {
        // Important:
        // it is not recommended to mutate the state
        // instead create a new array with concat method and assign it to the state
        setAllClicks(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAllClicks(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}
            <p>{allClicks.join(' ')}</p>
        </div>
    )
}