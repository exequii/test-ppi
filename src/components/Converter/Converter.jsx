import "./converter.css"
import { getCoins, getRatesByCoin } from "../../api/vatcomply"
import { useState, useEffect } from "react"
import Title from "../Title/Title"
import Footer from "../Footer/Footer"
import Loading from "../Loading/Loading"
import Alert from "../Alert/Alert"
import Dropdown from "../Dropdown/Dropdown"

const Converter = () => {

    const [values, setValues] = useState({
        amount: "1.00",
        from: ["US Dollar","$","USD"],
        to: ["Euro","€","EUR"],
    })

    const date = new Date()
    const [dataCoins, setDataCoins] = useState([])
    const [ratesByCoin, setRatesByCoin] = useState([])
    const [errorState, setErrorState] = useState({ hasError: false , loaded: false, calculated: false});
    const [multiplier, setMultiplier] = useState(1.0000)
    const [msg, setMsg] = useState(`Conversion from ${values.from[0]} to ${values.to[0]} - Last updated: ${date}`)
    const [from, setFrom] = useState("US Dollar-$-USD")
    const [to, setTo] = useState("Euro-€-EUR")

    useEffect(()=>{
      getCoins().then(setDataCoins).catch(handleError)
    },[])

    useEffect(()=>{
        setErrorState({...errorState, calculated: false})
        getRatesByCoin(values.from[2]).then((response) => {
            setRatesByCoin(response)
            setMsg(`Conversion from ${values.from[0]} to ${values.to[0]} - Last updated: ${date}`)
            setErrorState({hasError: false, loaded: true, calculated: true})
        })
        .catch((err) => {
            handleError(err)
        }) 
    },[values.from, values.to])

    useEffect(()=>{
        setMultiplier(findRate(ratesByCoin,values.to[2]))
    },[ratesByCoin])

  
    const handleError = (err) => {
      setErrorState({ hasError: true, loaded: false, calculated: false});
    }

    const handleChange = (event) => {
        if(event.nativeEvent.data !== "-"){
            if(event.target.value !== ""){
                var arrayOption = event.target.value.split("-")
                const newValues = {
                    ...values,
                    [event.target.name]:  arrayOption,
                }
                setValues(newValues)
                if(event.target.name === "from") setFrom(event.target.value)
                if(event.target.name === "to") setTo(event.target.value)
            }
        }
    }

    const findRate = (ratesByCoin, coinTo) => {
        var multiplier = 1.0000;
        if(ratesByCoin.length !== 0 ){
            ratesByCoin.forEach((element,index) => {
                if(element[0] === coinTo) multiplier = element[1]
            })
            return multiplier
        }else{
            return multiplier
        }
    }

    const flip = () => {
        const newValues = {
            ...values,
            from: values.to,
            to: values.from
        }
        setFrom(values.to.join("-"))
        setTo(values.from.join("-"))
        setValues(newValues)
    }

    const refresh = () => {
        const newValues = {
            ...values,
            from: ["US Dollar","$","USD"],
            to: ["Euro","€","EUR"],
        }
        setValues(newValues)
        getRatesByCoin(values.from[2]).then((response) => {
            setRatesByCoin(response)
            setMsg(`Conversion from ${values.from[0]} to ${values.to[0]} - Last updated: ${date}`)
            setErrorState({hasError: false, loaded: true, calculated: true})
        })
        .catch((err) => {
            handleError(err)
        }) 
    }

    return(
        <div className="convertContainer">
            {
                errorState.hasError ? 
                <div className="errorContainer">
                    <p className="error">An error has occurred. Please try again later.</p>
                    <button className="btn" onClick={refresh}>Back to Home</button>
                </div>
                :
                <>
                    <Title value={values}></Title>
                    {
                    errorState.loaded ? 
                    <div className="formConverter">
                        <div className="w-100 d-flex column">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" name="amount" onChange={handleChange} value={values.amount} className="input" step={0.01} min="1.00"></input>
                        </div>
                        <Dropdown name="from"
                                  value={from} 
                                  dataCoins={dataCoins} 
                                  onChange={(e)=>{handleChange(e)}} 
                                  img={true}
                                  flip={(e)=>{flip()}}>
                        </Dropdown>
                        <Dropdown name="to"
                                  value={to} 
                                  dataCoins={dataCoins} 
                                  onChange={(e)=>{handleChange(e)}} 
                                  img={false}
                                  flip={(e)=>{flip()}}>
                        </Dropdown>
                    </div>
                    :
                    <>
                        <Loading msg="Loading resources..."></Loading>
                    </>
                    }

                    {
                        errorState.calculated ?
                        <div className="resultConvert d-flex column">
                            <div>
                                <div className="convertFrom mb-2">{values.amount} {values.from[0]} =</div>
                                <div className="convertTo">{(values.amount * multiplier).toFixed(2)} {values.to[0]}</div>
                            </div>
                            <div>
                                <div className="coinValue mb-1">1 {values.from[1]} = {multiplier.toFixed(4)} {values.to[2]}</div>
                                <div className="coinValue">1 {values.to[2]} = {(1 / multiplier).toFixed(4)} {values.from[1]}</div>
                            </div>
                            <Alert msg="We use the market rate. This is for informational purposes only."></Alert>
                        </div>
                    :
                        <>
                            <Loading msg="Calculated..."></Loading>
                        </>
                    }
                    <Footer msg={msg}></Footer>
                </>
            }
        </div>
    )
}

export default Converter