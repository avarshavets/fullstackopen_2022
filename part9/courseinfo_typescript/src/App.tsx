import React from 'react';
import './App.css';
import Head from "./components/Head";
import Total from "./components/Total";
import Content from "./components/Content";
import { Part } from "./components/Part";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts :Part[] =[
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

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
