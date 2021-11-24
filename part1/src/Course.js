const Course = ({course}) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  const Header = ({name}) => 
        <h1>{name}</h1>
  
  const Content = ({parts}) => {
    return (
      
      <> 
        {parts.map((part,index) => (
        <Part key={part.id} part={parts[index]} />))}
       
      </>
    )
  }
  const Total = ({parts}) => {
  
    return <p>Number of exercises {parts.reduce((prev,curr) => {
      return((prev.exercises ? prev.exercises : prev) + curr.exercises) 
      }
    )
    }  
    </p> 
  
  }
  
  const Part = ({part}) => <p>{part.name} {part.exercises}</p>

  export default Course