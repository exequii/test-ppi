import React from 'react'
import "./alert.css"
import alertIcon from "../../assets/alertIcon.png"

const Alert = (props) => {
  return (
    <div className='alert'>
        <img src={alertIcon} alt="alert symbol" className='alertIcon'/>
        <p>{props.msg}</p>
    </div>
  )
}

export default Alert