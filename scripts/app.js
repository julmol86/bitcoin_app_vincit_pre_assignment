// Program that calculates:
// A. How many days is the longest bearish (downward) trend within a given date range
// B. Which date within a given date range had the highest trading volume
// C. Tells the best day for buying/selling bitcoin for a given date range

// DOM manipulation variables
const dataForm = document.querySelector('form');
const results = document.querySelector('.results');

// function that displays results to user
const updateUI = (data) => {
    console.log(data)
    results.innerHTML = `
    <h4>Results for period</h4>
    <h5>${data.starting} - ${data.ending}</h5>
    <h4>The maximum amount of days bitcoin price was decreasing in a row </h4>
    <h5>${data.maxDownward}</h5>
    <h4>Date with the highest trading volume </h4>
    <h5>${data.maxVolume.date}</h5>
    <h4>Highest trading volume </h4>
    <h5>${data.maxVolume.value} € </h5>
    <h4>The day to buy bitcoins </h4>
    <h5>${data.profitDays.dateForBuy}</h5>
    <h4>The day to sell bitcoins</h4>
    <h5>${data.profitDays.dateForSale}</h5>
    `;
}

// listen to UI changes
dataForm.addEventListener('submit', e => {
    e.preventDefault(); //prevent default action

    // get value from datepicker in format YYYY-MM-DD e.g. 2012-02-10
    const startDateString = dataForm.startDate.value;
    const endDateString = dataForm.endDate.value;

    // convert date to UTC format
    const startDateUtc = new Date(startDateString)
    const endDateUtc = new Date(endDateString)

    // convert date to timestamp in seconds 
    const startDateSeconds = convertUtcDateToSeconds(startDateUtc);
    const endDateSeconds = convertUtcDateToSeconds(endDateUtc) + 3600;  // 1 hour added so there will be always non-empty response (mentioned in task)
    console.log(startDateString, startDateUtc, endDateString,  startDateSeconds, endDateSeconds )

    dataForm.reset();

    //update the UI with new data
    updateData(startDateSeconds, endDateSeconds)
        .then(data => updateUI(data))
        
        .catch(err => {
            console.log(err)
            results.innerHTML = '<h5>Error: Please check start date and end date and try again</h5>';
        });
})

// "main" function
const updateData = async (startDate, endDate) => {
    try {
        const bitcoinData = await fetchData(startDate, endDate);
        
        const priceList = bitcoinData.prices // get all prices for the period
        const volumeList = bitcoinData.total_volumes // get all volumes for the period
        console.log("price", priceList)
        console.log("volume", volumeList)
        const y = priceList[0][0]
        const x = priceList[0][1]

        const dayPrices = getDailyData(priceList, startDate, endDate) // get timestamp and only one price per day
        const dayVolumes = getDailyData(volumeList, startDate, endDate) // get timestamp and only one volume per day
    
        console.log(dayPrices)
        console.log(dayVolumes)
        const maxDownward = getMaxDecrease(dayPrices) // find max downward (answer to A-task)
        console.log(maxDownward)

        const maxVolume = getMaxValue(dayVolumes) // find max volume (answer to B-task)  
        console.log('max volume', maxVolume.value, 'date', maxVolume.date)

        const starting = convertMillisecondsToDateString(startDate*1000)
        const ending = convertMillisecondsToDateString(endDate*1000)

        let profitDays = {dateForBuy: "Don't buy", dateForSale: "Don't sell"}
        
        // Note: C-task (buying and selling dates) are not calculated if:
        // - time range has only one day
        // - price constantly decreasing on the whole time range
        if (maxDownward !== dayPrices.length-1){
            profitDays = getBuySellDays(dayPrices) // get best day for buying and selling (answer to C-task)
        }
        console.log(profitDays)

        return {maxDownward, maxVolume, profitDays, starting, ending}
    } catch (e) {
        console.log(e)
        throw e
    }        
}