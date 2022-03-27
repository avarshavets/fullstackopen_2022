import './App.css';
// import { Table } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from "react";


const StatLine = ({text, value}) => (
    <div>{text} {value}</div>
)

const Button = (props) => (
    <button onClick = {props.handleClick}>{props.text}</button>
)

const DisplayStats = ({good, neutral, bad}) => {
    const score = {good: 1, neutral: 0, bad: -1}

    // stats calculation
    const total = good + neutral + bad
    const averageScore = ((good*score.good + neutral*score.neutral + bad*score.bad) / total).toFixed(2)
    const positive = (good / total * 100).toFixed(2)

    // conditional rendering
    if (total > 0) {
        return (
            <table>
                <tbody>
                <tr>
                    <td><StatLine text='good'/></td>
                    <td><StatLine value={good}/></td>
                </tr>
                <tr>
                    <td><StatLine text='neutral'/></td>
                    <td><StatLine value={neutral}/></td>

                </tr>
                <tr>
                    <td><StatLine text='bad'/></td>
                    <td><StatLine value={bad}/></td>
                </tr>
                <tr>
                    <td><StatLine text='all'/></td>
                    <td><StatLine value={total}/></td>
                </tr>
                <tr>
                    <td><StatLine text='average'/></td>
                    <td><StatLine value={averageScore}/></td>
                </tr>
                <tr>
                    <td><StatLine text='positive'/></td>
                    <td><StatLine value={`${positive}%`}/></td>
                </tr>
                </tbody>
            </table>
        )
    }
    return (
        <div>No feedback given yet.</div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGood} text={'good'}/>
            <Button handleClick={handleNeutral} text={'neutral'}/>
            <Button handleClick={handleBad} text={'bad'}/>
            <h1>statistics</h1>
            <DisplayStats good={good} neutral={neutral} bad={bad}/>
        </div>

    )
}

export default App;
