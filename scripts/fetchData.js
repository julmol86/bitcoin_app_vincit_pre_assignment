// function that fetches data from coingecko API
const fetchData = async (startDate, endDate) => {
    const base = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range';
    const query = `?vs_currency=eur&from=${startDate}&to=${endDate}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data
}
