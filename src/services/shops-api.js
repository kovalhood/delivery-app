import axios from 'axios'; 
const BASE_URL = 'https://deliveryappbackend-kovalhood.b4a.run/shops';

export function getShops() {
    return axios.get(BASE_URL).then(response => response.data);
}