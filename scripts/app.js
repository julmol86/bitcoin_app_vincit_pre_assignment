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
        <h5>Results for period</h5>
        <h5>${data.y}</h5>
        <h5>Price</h5>
        <h5>${data.x}</h5>
        <h5>Downward</h5>
        <h5>${data.maxDownward}</h5>

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
        return {x, y, maxDownward}
    } catch (e) {
        console.log(e)
        throw e
    }        
}