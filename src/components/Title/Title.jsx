import React from 'react'
import "./title.css"

const Title = (props) => {

  return (
    <div className='title'>
        Convert {props.value.amount} {props.value.from[0]} to {props.value.to[0]} - {props.value.from[1]} to {props.value.to[1]}
    </div>
  )
}

export default Title