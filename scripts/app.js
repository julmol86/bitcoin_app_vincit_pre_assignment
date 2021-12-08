// Program that calculates:
// A. How many days is the longest bearish (downward) trend within a given date range
// B. Which date within a given date range had the highest trading volume
// C. Tells the best day for buying/selling bitcoin for a given date range

// "main" function
const updateData = async (startDate, endDate) => {
    
    const bitcoinData = await fetchData(startDate, endDate);
    
    const priceList = bitcoinData.prices // get all prices for the period
    const volumeList = bitcoinData.total_volumes // get all volumes for the period
    console.log("price", priceList)
    console.log("volume", volumeList)
      
    return bitcoinData
}
updateData(1609459200, 1609549200)