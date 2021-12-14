// A-task
// function that calculates max downward trend inside given range 
const getMaxDecrease = (arr) => {
    let maxPeriod = 0
    let current = 0

    for(let i = 1; i < arr.length; i++) {   
        const balance = arr[i][1]-arr[i - 1][1]      
        if(balance < 0){
            current++ 
            
            console.log('new down price', current, arr[i][1], arr[i - 1][1], balance)               
        }
        else{
            if(current > maxPeriod){
                maxPeriod = current
                console.log('longer downward, max:', maxPeriod, arr[i])    
            }
            current = 0
        }                         
    }   
    return current > maxPeriod ? current : maxPeriod // in case if downward is in the end of the range
}

// B-task
// function returns max value and its date
const getMaxValue = (arr) => {
    const objArr = arr.map(x => ({ date: convertMillisecondsToDateString(x[0]), value: x[1] }));

    // note: it is assumed that array is always non-empty, therefore there is no empty-check inside
    let max = objArr[0]
    objArr.forEach(obj => {
        if(obj.value > max.value) {            
            max = obj        
        }
    })
    console.log(max)
    return max
}

// C-task
// function that calculates best buying and selling day for the given time range
const getBuySellDays = (arr) => {
    console.log(arr)
    let maxDiff = arr[1][1] - arr[0][1]
    let buyDateMillis
    let sellDateMillis
    var ostohinta
    var myyntihinta
    console.log('max_diff', maxDiff)
    for(var i = 0; i < arr.length; i++){
        for(var j = i + 1; j < arr.length; j++){
            if(arr[j][1] - arr[i][1] >= maxDiff){
                maxDiff = arr[j][1] - arr[i][1]
                buyDateMillis = arr[i][0]
                ostohinta = arr[i][1]
                myyntihinta = arr[j][1]
                sellDateMillis = arr[j][0]
                console.log('max_diff1', maxDiff)               
            }
        }
    }

    console.log('max_diff2', maxDiff,'ostaa:', buyDateMillis, 'hinta:', ostohinta, 'myy', sellDateMillis, 'myyntihinta:', myyntihinta) 

    return {
        dateForBuy: convertMillisecondsToDateString(buyDateMillis),
        dateForSale: convertMillisecondsToDateString(sellDateMillis)
    }
}