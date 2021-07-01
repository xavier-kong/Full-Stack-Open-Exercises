import React from 'react';
import ReactDOM from 'react-dom';

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const Course = ({ course }) => {
    const Header = ({ course }) => {
      return (
    <h1>{course.name}</h1>
      )
    }
    const Content = ({ course }) => {
      const Part = ({ name, exercises }) => {
        return (
          <p>
            {name} {exercises}
          </p>    
        )
      }
      return (
        <div>
          {course.parts.map(part => (
            <Part 
              name={part.name} 
              exercises={part.exercises} 
              key={part.id} 
            />
          ))}
        </div>
      )
    }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
}
  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
