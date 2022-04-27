// reusable component that makes form visible/invisible

import React, {forwardRef, useImperativeHandle, useState} from "react";

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
                <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {/* child component defined inside <Toggeable>...<Toggleable/> */}
                {props.children}
                <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
            </div>
        </div>
    )
})

export default Toggleable