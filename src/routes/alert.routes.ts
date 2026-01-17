import { Router } from 'express';
import { createAlert } from '../modules/alerts/controller';

const router = Router();

router.post('/alerts', createAlert);

export default router;
