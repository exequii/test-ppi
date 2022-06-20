import React from 'react'
import loading from "../../assets/loading.gif"
import "./loading.css"

const Loading = (props) => {
  return (
    <div className="loadingContainer">
        <p className="loading">{props.msg}</p>
        <img src={loading} alt="loading" className="imgLoading"></img>
    </div>
  )
}

export default Loading