import dotenv from "dotenv";
dotenv.config();

export const config = {
    "DATABASE_URL" : process.env.DATABASE_URL,
    "SERVICE_PORT" : process.env.SERVICE_PORT,
    "DEPLOYEMENT_ENV" : process.env.DEPLOYEMENT_ENV,
    "PUBLIC_RATE_LIMITING" : process.env.PUBLIC_RATE_LIMITING,
    "CRYPTO_API_TOKEN" : process.env.COINGECKO_API_TOKEN,
    "API_KEY" : process.env.API_KEY
}