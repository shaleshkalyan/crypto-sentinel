import dotenv from "dotenv";
dotenv.config();

export const config = {
    "DATABASE_URL" : process.env.DATABASE_URL,
    "SERVICE_PORT" : process.env.SERVICE_PORT,
    "DEPLOYEMENT_ENV" : process.env.DEPLOYEMENT_ENV
}