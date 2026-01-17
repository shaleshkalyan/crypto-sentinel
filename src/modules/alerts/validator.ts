import { CreateAlertDTO } from './types';

/**
 * Validate create alert payload
 */
export const validateCreateAlert = (
    payload: Partial<CreateAlertDTO>
): string | null => {
    if (!payload.userId || typeof payload.userId !== 'string') {
        return 'User Id is required and must be a string';
    }

    if (payload.userId.length > 100) {
        return 'User Id is too long';
    }

    if (!payload.coinId || typeof payload.coinId !== 'string') {
        return 'Coin Id is required and must be a string';
    }

    if (payload.coinId.length > 50) {
        return 'Coin Id is too long';
    }

    if (typeof payload.targetPrice !== 'number' || payload.targetPrice <= 0) {
        return 'Price must be a positive number';
    }

    if (payload.condition !== 'ABOVE' && payload.condition !== 'BELOW') {
        return 'Condition must be either ABOVE or BELOW';
    }

    return null;
};
