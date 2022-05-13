const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinID: string) {
    return fetch(`${BASE_URL}/coins/${coinID}`).then((res) => res.json());
}

export function fetchTicker(coinID: string) {
    return fetch(`${BASE_URL}/ticker/${coinID}`).then((res) => res.json());
}

export function fetchHistorical(coinID: string) {
    const endDate = Math.floor(Date.now() / 1000);  
    const startDate = endDate - 60 * 60 * 24 * 7 * 4;
    return fetch(`${BASE_URL}/coins/${coinID}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((res) => res.json());
}