import 'dotenv/config';
import { AlertRepository } from '../modules/alerts/repository';
import { getUsdPrices } from '../external/coingecko/service';
import { config } from '../config/constants';


const POLL_INTERVAL_MS = Number(config.PUBLIC_RATE_LIMITING) * 60 * 1000;

const runPriceMonitor = async () => {
    try {
        console.log('Loading active alerts...');

        const alerts = await AlertRepository.listActiveAlerts();

        if (alerts.length === 0) {
            console.log('No active alerts');
            return;
        }

        const coinIds = [...new Set(alerts.map(alert => alert.coin_id))];

        const prices = await getUsdPrices(coinIds);

        for (const alert of alerts) {
            const currentPrice = prices[alert.coin_id]?.usd;

            if (currentPrice === undefined || currentPrice === null) continue;

            const targetPrice = Number(alert.target_price);

            const conditions: Record<string, boolean> = {
                'ABOVE': currentPrice > targetPrice,
                'BELOW': currentPrice < targetPrice
            };

            if (conditions[alert.condition]) {
                console.log(`ALERT TRIGGERED: ${alert.coin_id} (${alert.condition}) | Current: ${currentPrice} | Target: ${targetPrice}`);

                await AlertRepository.markAsTriggered(alert.id);
            }
        }
    } catch (error) {
        console.error('Price monitor error:', error);
    }
};

setInterval(runPriceMonitor, POLL_INTERVAL_MS);

runPriceMonitor();
