# Crypto Sentinel – Price Alert Service

## Objective
Crypto Sentinel is a Node.js (TypeScript) service that allows users to create cryptocurrency price alerts and triggers notifications when price conditions are met.

---

## Features
- Create, list, and delete price alerts
- Alert triggers once and moves from `ACTIVE` to `TRIGGERED`

---

## API Endpoints
- **POST** `/api/alerts` – Create alert
```json
{
  "userId": "user_001",
  "coinId": "bitcoin",
  "targetPrice": 40000,
  "condition": "ABOVE"
}
```
- **GET** – List alerts (pagination)

 - `/api/alerts`
 - `/api/alerts?page=1&limit=10`

- **POST** `/api/alerts/search` – List with filters
```json
{
  "page": 1,
  "limit": 10,
  "userId": "user_001",
  "status": "ACTIVE",
  "orderBy": "id",
  "direction": "DESC"
}
```
- **DELETE** `/api/alerts/:id` – Delete alert  

---

## Running Locally

### Prerequisites
- Node.js 20+
- PostgreSQL
- npm

### Steps
```bash
git clone https://github.com/shaleshkalyan/event-management-api.git
cd crypto-sentinel
npm install
```
## Environment Variables

```env
DATABASE_URL=''
SERVICE_PORT=''
DEPLOYEMENT_ENV=''
PUBLIC_RATE_LIMITING=''
COINGECKO_API_TOKEN=''
API_KEY=''
```
## Start Commands

```bash

npm run dev
npm run queues

```
## AI Usage 

- Architecture: AI was used to validate the dual-service design and database schema efficiency.
- Testing: AI-generated dummy data was used to populate the PostgreSQL database during development.This allowed for verifying the worker's trigger logic.
- Documentation : AI assisted in the generation of technical documentations and README structures.

## Production API url - 
- https://crypto-sentinel-production.up.railway.app/api

