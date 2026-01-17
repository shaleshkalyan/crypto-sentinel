import express from 'express';
import { sendSuccess } from './libs/utils';

const app = express();
app.use(express.json());

app.get('/check', (_req, res) => {
    sendSuccess(res,"Service running fine",[])
});

export default app;