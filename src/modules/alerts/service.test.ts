import { AlertService } from '../../services/alert.service';
import { AlertRepository } from './repository';
import { getUsdPrices } from '../../external/coingecko/service';

jest.mock('./repository');
jest.mock('../../external/coingecko/service');

describe('AlertService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create alert successfully', async () => {
        (AlertRepository.create as jest.Mock).mockResolvedValue({
            id: 'uuid-1',
            coin_id: 'bitcoin',
            target_price: '100',
        });

        const result = await AlertService.createAlert({
            userId: 'user-1',
            coinId: 'bitcoin',
            targetPrice: 100,
            condition: 'ABOVE',
        } as any);

        expect(AlertRepository.create).toHaveBeenCalled();
        expect(result.coin_id).toBe('bitcoin');
    });

    it('should trigger alert when price condition matches', async () => {
        (AlertRepository.listActiveAlerts as jest.Mock).mockResolvedValue([
            {
                id: 'uuid-2',
                coin_id: 'bitcoin',
                target_price: '100',
                condition: 'ABOVE',
            },
        ]);

        (getUsdPrices as jest.Mock).mockResolvedValue({
            bitcoin: { usd: 200 },
        });

        (AlertRepository.markAsTriggered as jest.Mock).mockResolvedValue(true);

        await AlertService.processActiveAlerts();

        expect(AlertRepository.markAsTriggered).toHaveBeenCalledWith('uuid-2');
    });

    it('should NOT trigger alert if condition does not match', async () => {
        (AlertRepository.listActiveAlerts as jest.Mock).mockResolvedValue([
            {
                id: 'uuid-3',
                coin_id: 'bitcoin',
                target_price: '300',
                condition: 'ABOVE',
            },
        ]);

        (getUsdPrices as jest.Mock).mockResolvedValue({
            bitcoin: { usd: 200 },
        });

        await AlertService.processActiveAlerts();

        expect(AlertRepository.markAsTriggered).not.toHaveBeenCalled();
    });
});
