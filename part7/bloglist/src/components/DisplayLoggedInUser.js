import React from 'react'

const DisplayLoggedInUser = ({ userName, handleLogout }) => (
  <>
    {userName} is logged in
    <span> </span>
    <button onClick={handleLogout}>logout</button>
  </>
)

export default DisplayLoggedInUser