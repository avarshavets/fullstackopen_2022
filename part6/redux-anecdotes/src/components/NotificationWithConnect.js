import { connect } from "react-redux";

const Notification = (props) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    if (props.notification) {
        return (
            <div style={style}>
                {props.notification}
            </div>
        )
    }

}

// function returns a map/dictionary/JS object with a prop and a matching state/state piece
// function can contain more complex logic (e.g. filter, etc.)
const mapStateToProps = (state) => {
    return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)