// reusable component that makes form visible/invisible
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // define functions/arguments can be accessed in the ref Object
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  // showWhenVisible is opposite of hideWhenVisible, e.g:
  // if blog form is displayed, then 'create new blog' button is not displayed
  const showWhenVisible = { display: visible? '' : 'none' }
  const hideWhenVisible = { display: visible? 'none' : '' }


  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
            variant="contained"
            color="primary"
            onClick={toggleVisibility}
            id='show-toggleable-button'>
          {props.showButtonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {/* child component defined inside <Toggeable>...<Toggleable/> */}
        {props.children}
        <Box sx={{marginTop: 1}}>
          <Button
              variant="contained"
              color="primary"
              onClick={toggleVisibility}
              id='hide-toggleable-button'>
            {props.hideButtonLabel}
          </Button>
        </Box>
      </div>
    </div>
  )
})

// add required string-type prop to Toggleable component using prop-types package
Toggleable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired
}

// forwardRef function in Toggleable component causes Toggleable component be anonymous ->
// there is no display name in Components tab of the browser's inspector
Toggleable.displayName = 'Toggleable'

export default Toggleable