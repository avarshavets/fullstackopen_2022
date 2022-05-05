import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const FilterForm = () => {
    const style = {
        marginBottom: 10
    }

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const filterText = e.target.value
        dispatch(filterChange(filterText))
    }

    const handleClick = (e) => {
        e.target.value=''
        dispatch(filterChange(''))
    }

    return (
        <div style={style}>
            filter
            <input onChange={handleChange}
                   onClick={handleClick}>

            </input>
        </div>
    )
}

export default FilterForm