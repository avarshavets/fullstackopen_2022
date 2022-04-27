const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const styleNotification = {
    color: notification.type === 'info' ? 'green' : 'red',
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: notification.type === 'info' ? 'green' : 'red',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={styleNotification}>{notification.message}</div>
  )
}

export default Notification