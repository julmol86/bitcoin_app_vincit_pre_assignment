// function that converts date to seconds
const convertUtcDateToSeconds = (date) => {
    const dateUtc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
    return dateUtc.getTime() / 1000; // convert milliseconds to seconds
}

