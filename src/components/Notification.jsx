
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector(({ notification }) => notification)
  if(!info.message) {
    return null
  }

  const style = {
    color: info.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }


  return (
    <div className="info" style={style}>
      {info.message}
    </div>
  )
}

export default Notification