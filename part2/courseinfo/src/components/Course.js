import React from 'react';

const Course = ({ courses }) => {

  const Header = ({ course }) => (
    <h1>{course.name}</h1>
  )

  const Content = ({ course }) => {
    const Part = ({ name, exercises }) => (
        <p>
          {name} {exercises}
        </p>    
    )
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
    let sums = course.parts
    .map(part => part.exercises)
    .reduce((a,b) => a + b, 0)

    return (
    <p><b>total of {sums} exercises</b></p>
    )
  }
    
return (
  <>
  {courses.map(course => 
  <div key={course.id}>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
    )
  }
  </>
)
}

export default Course;