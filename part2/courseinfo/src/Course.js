const Parts = ({parts}) => (
    parts.map(partObj => <p key={partObj.id}>{partObj.name} - {partObj.exercises}</p>)
)

const Course = ({course}) => {
    const exercisesSum =
        course.parts.map(partObj => partObj.exercises).reduce((sum, item) => sum + item, 0)

    return (
        <div>
            <h2>{course.name}</h2>
            <Parts parts={course.parts}/>
            <strong>total of {exercisesSum} exercises</strong>
        </div>
    )
}

export default Course;