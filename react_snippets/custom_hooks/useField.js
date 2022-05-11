// The hook function receives the type of the input field as a parameter.
// The function returns all of the attributes required by the input:
// its type, value and the onChange handler.

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

// --- useField in the App --- //
const App = () => {
    const name = useField('text')
    // ...

    return (
        <div>
            <form>
                <input
                    type={name.type}
                    value={name.value}
                    onChange={name.onChange}
                />
                // or using the spread syntax !!!
                <input {...name} />
            </form>
        </div>
    )
}