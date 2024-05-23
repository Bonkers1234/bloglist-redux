
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector(({ notification }) => notification)
  if(!info.message) {
    return null
  }

  return (
    <div className={`info alert alert-${info.type === 'error' ? 'danger' : 'success'} my-2`} role='alert'>
      <div>{info.message}</div>
    </div>
  )
}

export default Notification