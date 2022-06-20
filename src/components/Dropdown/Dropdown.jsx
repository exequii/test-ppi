import React from 'react'
import "./dropdown.css"
import icon from "../../assets/iconChange.png"

const Dropdown = (props) => {

  return (
    <div className="w-100 d-flex column mt-4">
        <label htmlFor={props.name}>To:</label>
        <div className="input-icon">
            <select name={props.name} onChange={props.onChange} value={props.value}>
            {
                props.dataCoins.map((element,index) => {
                    return <option value={element.name + "-" + element.symbol + "-" + element.type} key={index} >{element.symbol} - {element.name}</option>
                })
            }
            </select>
            {
            props.img ?
                <img src={icon} alt="icon change" className="icon" onClick={props.flip}></img>
            :
            <></>
            }
        </div>
    </div>

  )
}

export default Dropdown