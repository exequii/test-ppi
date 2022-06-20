import { parsedCoins } from "../utilities/parsedObjects"

const URL_API_CURRENCIES = "https://api.vatcomply.com/currencies"
const URL_API_RATES = "https://api.vatcomply.com/rates?base="

export async function getCoins(){
    var response = await fetch(URL_API_CURRENCIES)
    var data = await response.json()
    const dataParsed = parsedCoins(data)
    return dataParsed;
}

export async function getRatesByCoin(coin){
        var response = await fetch(URL_API_RATES + coin)
        var data = await response.json()
        const dataParsed = Object.entries(data.rates)
        return dataParsed;
}



