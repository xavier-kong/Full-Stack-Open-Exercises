import React from 'react';
import ReactDOM from 'react-dom';


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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
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

    const Total = ({ course }) => {
      let sums = course.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)
      return (
      <p><b>total of {sums} exercises</b></p>
      )
    }
      
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}
  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
