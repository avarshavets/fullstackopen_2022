// Note:
// It is NOT recommended to put all state 'pieces' into a single object!!!
// Instead --> split state into multiple state variables based on which values tend to change together.

const App = () => {
    // click is an object with multiple state 'pieces'
    const [click, setClick] = useState({left: 0, right: 0})


    return (
        <div>
            {click.left}
            {/* use Spread Syntax (...) to compress {right: click.right, left: click.left + 1}) */}
            <button onClick={() => setClick({...click, left: click.left + 1})}>
                left click
            </button>
            <button onClick={() => setClick({...click, right: click.right + 1})}>
                right click
            </button>
            {click.right}
        </div>
    )
}