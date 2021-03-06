import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null
  }

  // const styleNotification = {
  //   color: notification.type === 'info' ? 'green' : 'red',
  //   backgroundColor: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderColor: notification.type === 'info' ? 'green' : 'red',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10
  // }
  return (
    <Alert severity={notification.type === 'alert' ? 'error' : 'success'}>
      {notification.message}
    </Alert>
  )
}

export default Notification