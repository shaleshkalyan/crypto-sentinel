import express from 'express';
import { sendSuccess } from './libs/utils';
import alertRoutes from './routes/alert.routes';
import { apiMiddleware } from './middlewares/apiMiddleware';
import { apiRateLimiter } from './middlewares/apiRateLimiter';

const app = express();
app.use(express.json());

app.use(apiRateLimiter);
app.use(apiMiddleware);
app.use('/api', alertRoutes);

app.get('/check', (_req, res) => {
    sendSuccess(res,"Service running fine",[])
});

export default app;