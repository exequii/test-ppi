export function parsedCoins(data){
    var dataParsed = []
    var dataValues = Object.values(data)
    var dataKeys = Object.keys(data)
    
    dataValues.forEach((element,index)=> {
        var obj = {
          ...element,
          type: dataKeys[index]
        }
        dataParsed.push(obj)
    })

    return dataParsed
}


