import 'dotenv/config';
import { AlertService } from '../services/alert.service';
import { config } from '../config/constants';

const POLL_INTERVAL_MS =
    Number(config.PUBLIC_RATE_LIMITING) * 60 * 1000;

const startPriceMonitor = async () => {
    console.log(
        `Price monitoring started (every ${config.PUBLIC_RATE_LIMITING} minutes)...`
    );

    await AlertService.processActiveAlerts();

    setInterval(async () => {
        try {
            await AlertService.processActiveAlerts();
        } catch (error) {
            console.error('Worker execution failed:', error);
        }
    }, POLL_INTERVAL_MS);
};

startPriceMonitor();
