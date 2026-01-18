import request from 'supertest';
import express from 'express';
import alertRoutes from '../routes/alert.routes';
import { AlertRepository } from '../modules/alerts/repository';

jest.mock('../modules/alerts/repository');

const app = express();
app.use(express.json());
app.use('/api', alertRoutes);

describe('Alert API', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('create alert API', async () => {
        (AlertRepository.create as jest.Mock).mockResolvedValue({
            id: 'uuid-1',
            coin_id: 'bitcoin',
        });

        const response = await request(app)
            .post('/api/alerts')
            .send({
                userId: 'user-1',
                coinId: 'bitcoin',
                targetPrice: 100,
                condition: 'ABOVE',
            });

        expect(response.status).toBe(201);
        expect(response.body.responseStatus).toBe('success');
    });
    
    it('Get list alerts API', async () => {
        (AlertRepository.list as jest.Mock).mockResolvedValue([]);
        (AlertRepository.count as jest.Mock).mockResolvedValue(0);
        
        const response = await request(app)
        .get('/api/alerts?page=1&limit=10');
        
        expect(response.status).toBe(200);
        expect(response.body.responseStatus).toBe('success');
    });

    it('delete alert API', async () => {
        (AlertRepository.deleteById as jest.Mock).mockResolvedValue({
            id: 'uuid-1',
        });

        const response = await request(app)
            .delete('/api/alerts/uuid-1');

        expect(response.status).toBe(500);
        expect(response.body.responseStatus).toBe('error');
        expect(response.body.message).toBe("Invalid alert id format");
    });
});
