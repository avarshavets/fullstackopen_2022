import { useSelector } from "react-redux"

const Notification = () => {
  // notification state piece is an object { message, timeoutId }
  const notification = useSelector(state => state.notification.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    return (
        <div style={style}>
          {notification}
        </div>
    )
  }

}

export default Notification