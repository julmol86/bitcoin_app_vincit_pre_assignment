// function that converts date to seconds
const convertUtcDateToSeconds = (date) => {
    const dateUtc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
    return dateUtc.getTime() / 1000; // convert milliseconds to seconds
};

// function that gets one value per day (first one after midnight)
const getDailyData = (arr, startDateSeconds, endDateSeconds) => {
    const dailyData = [];
    for (let i = startDateSeconds * 1000; i <= endDateSeconds * 1000; i += 86400000) {
        arr = arr.filter(x => x[0] >= i);
        dailyData.push(arr[0]);
    };
    return dailyData;
};

// function that converts milliseconds into human-readable string format
// note: since data coming from REST interface within the first hour of each day (see coingecko documentation) timezone offset is not taken into account
const convertMillisecondsToDateString = (millis) => {
    const date = new Date(millis);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const datestring = `${day} ${month} ${year}`;
    return datestring;
};