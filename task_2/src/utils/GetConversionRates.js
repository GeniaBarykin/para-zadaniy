export function getConversionRates(){
    let url = 'https://v6.exchangerate-api.com/v6/8d018f67be133019c5538f35/latest/USD';
    return fetch(url);
}