import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material'

const UsersView = () => {
  const users = useSelector(state => state.users)
  const loggedInUser = useSelector(state => state.user)

  return (
    <div id='logged-in-user'>
      <h2>Users</h2>
      <TableContainer>
          <Table>
              <TableBody>
                  <TableRow>
                      <TableCell> </TableCell>
                      <TableCell variant='head'
                                 align='right'>
                          blogs created
                      </TableCell>
                  </TableRow>
                  {users.map(user =>
                      <TableRow key={user.id}>
                          <TableCell>
                              <Link to={
                                  loggedInUser.username !== user.username
                                      ? `/users/${user.id}`
                                      : '/home'}>{user.name}
                              </Link>
                          </TableCell>
                          <TableCell align='right'>
                              {user.blogs.length}
                          </TableCell>
                      </TableRow>
                  )}
              </TableBody>
          </Table>
      </TableContainer>
    </div>
  )
}

export default UsersView