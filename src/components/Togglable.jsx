
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='mx-auto w-50 mb-3'>
      <div className='text-center' style={hideWhenVisible}>
        <button className='btn btn-info' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className='text-center' style={showWhenVisible}>
        {props.children}
        <button className='btn btn-info' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
