import { useEffect, useState } from 'react'

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        const primary = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
        const fallback = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;

        const fetchRates = async () => {
            try {
                let res = await fetch(primary);
                if (!res.ok) res = await fetch(fallback);
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                const json = await res.json();
                setData(json[currency] ?? {});
            } catch (err) {
                console.error("Failed to fetch currency rates:", err);
                setData({});
            }
        };

        fetchRates();
    }, [currency]); //currency is the dependency array

    return data;
}
export default useCurrencyInfo;

//what does this hook do?
//it fetches the currency data from the API for a given currency and 
//returns it as an object with the currency code as the key and the currency data as the value
