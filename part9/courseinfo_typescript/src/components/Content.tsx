import CoursePart, {Part} from "./Part";


const Content = ({ courseParts }: { courseParts: Array<Part> }) : JSX.Element => {
    const style = {marginBottom: 10}
    return (
        <div>
            {courseParts.map(p =>
                <div key={p.name} style={style}>
                    <CoursePart part={p}/>
                </div>)}
        </div>
    )
}

export default Content