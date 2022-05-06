// import { useDispatch } from "react-redux"
import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer"

const FilterForm = (props) => {
    const style = {
        marginBottom: 10
    }

    // const dispatch = useDispatch()

    const handleChange = (e) => {
        const filterText = e.target.value
        props.filterChange(filterText)
    }

    const handleClick = (e) => {
        e.target.value=''
        props.filterChange('')
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

export default connect(
    null,
    { filterChange })(FilterForm)z