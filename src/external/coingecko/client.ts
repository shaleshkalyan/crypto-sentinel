import axios from 'axios';
import { config } from '../../config/constants';

export const coingeckoClient = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 5000,
    headers: {
        Accept: 'application/json',
        'x-cg-demo-api-key': config.CRYPTO_API_TOKEN
    },
});
