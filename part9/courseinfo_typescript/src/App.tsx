import React from 'react';
import './App.css';
import Head from "./components/Head";
import Total from "./components/Total";
import Content from "./components/Content";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalSum = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
      <div>
        <Head courseName={courseName} />
        <Content courseParts={courseParts}/>
        <Total totalSum={totalSum} />
      </div>
  );
};

export default App;
