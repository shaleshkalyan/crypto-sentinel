import { Router } from 'express';
import { createAlert, deleteAlert, listAlert, listAlertsWithFilter } from '../modules/alerts/controller';

const router = Router();

router.post('/alerts', createAlert);
router.get('/alerts', listAlert)
router.post('/alerts/search', listAlertsWithFilter);
router.delete('/alerts/:id', deleteAlert)

export default router;
