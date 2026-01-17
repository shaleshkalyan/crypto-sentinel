import { Router } from 'express';
import { createAlert, listAlert, listAlertsWithFilter } from '../modules/alerts/controller';

const router = Router();

router.post('/alerts', createAlert);
router.get('/alerts', listAlert)
router.post('/alerts/search', listAlertsWithFilter);

export default router;
