import './App.css';
// 1.1-1.2
// Multiple functional components.
// Input data passed through props.
// 1.3-1.4
// Modifying input data as an array of objects.
// Use map() and reduce() to return the sum of the elements in the array.

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
};

const Content = (props) => {
  return (
      <>
          {/*<p>*/}
          {/*  {props.parts[0].name} {props.parts[0].exercises}*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*    {props.parts[1].name} {props.parts[1].exercises}*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*    {props.parts[2].name} {props.parts[2].exercises}*/}
          {/*</p>*/}

          {/* Alternatively -- Create a list of paragraphs using map() */}
          {props.course.parts.map(item => <p>{item.name} {item.exercises}</p>)}
      </>
  )
};

const Total = (props) => {
    // function totalSum() {
    //     let result = 0;
    //     for (let i = 0; i < props.parts.length; i++) {
    //         result += props.parts[i].exercises
    //     }
    //     return result
    // }
    // ----- Alternatively ---------------------------------------------
    // create a new array that consists of only exercises by using map()
    // call reduce() on a newly created array of exercises
    const totalSum = props.course.parts.map(item => item.exercises).reduce(
        (prev, cur) => prev + cur, 0
    )
    return (
        <p>
            Number of exercises = {totalSum}
        </p>
    )
}


function App() {
  const course = {
      name: 'Half Stack application development',
      parts: [
          {
              name: 'Fundamentals of React',
              exercises: 10
          },
          {
              name: 'Using props to pass data',
              exercises: 7
          },
          {
              name: 'State of a component',
              exercises: 14
          }
          ]
  }

  return (
      <div>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </div>
  )
}

export default App;
