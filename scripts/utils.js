// function that converts date to seconds
const convertUtcDateToSeconds = (date) => {
    const dateUtc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
    return dateUtc.getTime() / 1000; // convert milliseconds to seconds
}

// function that gets one value per day (first one after midnight)
const getDailyData = (arr, startDateSeconds, endDateSeconds) => {
    const dailyData = []
    for (let i = startDateSeconds * 1000; i <= endDateSeconds * 1000; i += 86400000) {
        arr = arr.filter(x => x[0] >= i)
        dailyData.push(arr[0]);
    }
    return dailyData;
}
