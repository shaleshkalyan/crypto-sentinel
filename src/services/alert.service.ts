import { AlertRepository } from '../modules/alerts/repository';
import { getUsdPrices } from '../external/coingecko/service';
import { CreateAlertDTO, ListValidationType, PaginationParamsType } from '../modules/alerts/types';


export class AlertService {
    /**
     * Create alert
     */
    static async createAlert(payload: CreateAlertDTO) {
        return AlertRepository.create(payload);
    }

    /**
     * List alerts without filters.
     */
    static async listAlerts(
        pagination: PaginationParamsType
    ) {
        const limit = pagination.limit ?? 10;
        const page = pagination.page ?? 1;

        const offset = (page - 1) * limit;

        const [alerts, total] = await Promise.all([
            AlertRepository.list({}, { limit, offset }),
            AlertRepository.count({}),
        ]);

        return {
            alerts,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * List alerts with filters.
     */
    static async listAlertsWithFilter(
        payload: ListValidationType
    ) {
        const {
            page = 1,
            limit = 10,
            userId,
            status,
        } = payload;

        const offset = (page - 1) * limit;

        const filters = { userId, status };

        const [alerts, total] = await Promise.all([
            AlertRepository.list(filters, { limit, offset }),
            AlertRepository.count(filters),
        ]);

        return {
            alerts,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Delete alert
     */
    static async deleteAlert(id: string) {
        const deleted = await AlertRepository.deleteById(id);

        if (!deleted) {
            throw new Error('Alert not found');
        }

        return deleted;
    }

    /**
     * Process all active alerts and trigger them if conditions match
     */
    static async processActiveAlerts(): Promise<void> {
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
            if (currentPrice == null) continue;

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
    }
}
