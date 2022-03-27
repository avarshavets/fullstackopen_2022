import './App.css';

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
};

const Content = (props) => {
  const parts_arr = props.course.parts
  return (
      <>
        {parts_arr.map(item => <p>{item.name} {item.exercises}</p>)}
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
  const parts_arr = props.course.parts
  const totalSum = parts_arr.map(item => item.exercises).reduce(
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
