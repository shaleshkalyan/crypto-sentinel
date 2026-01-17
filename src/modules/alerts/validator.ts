import { CreateAlertDTO, ListValidationType, PaginationParamsType } from './types';

/**
 * Validate create alert payload
 */
export const validateCreateAlert = (
    payload: Partial<CreateAlertDTO>
): null => {
    if (!payload.userId || typeof payload.userId !== 'string') {
        throw new Error('User Id is required and must be a string');
    }

    if (payload.userId.length > 100) {
        throw new Error('User Id is too long');
    }

    if (!payload.coinId || typeof payload.coinId !== 'string') {
        throw new Error('Coin Id is required and must be a string');
    }

    if (payload.coinId.length > 50) {
        throw new Error('Coin Id is too long');
    }

    if (typeof payload.targetPrice !== 'number' || payload.targetPrice <= 0) {
        throw new Error('Price must be a positive number');
    }

    if (payload.condition !== 'ABOVE' && payload.condition !== 'BELOW') {
        throw new Error('Condition must be either ABOVE or BELOW');
    }

    return null;
};

/**
 * Validate get alert list payload with filters.
 */
export const validateListAlert = (
    payload: Partial<ListValidationType>
): null => {
    const parsedPage = payload.page ? Number(payload.page) : 1;
    const parsedLimit = payload.limit ? Number(payload.limit) : 10;

    if (
        Number.isNaN(parsedPage) ||
        parsedPage < 1 ||
        Number.isNaN(parsedLimit) ||
        parsedLimit < 1
    ) {
        throw new Error('Invalid pagination parameters');
    }

    if (parsedLimit > 100) {
        throw new Error('Limit cannot exceed 100');
    }

    if (!payload.userId) {
        throw new Error('Invalid status for alert list found.');
    }

    if (!payload.status || typeof payload.status !== 'string' || payload.status !== "ACTIVE") {
        throw new Error('Invalid status for alert list found.');
    }

    return null;
};

/**
 * Validate get alert list for pagination.
 */
export const parsePagination = (
    page?: unknown,
    limit?: unknown
): null => {
    const parsedPage = page ? Number(page) : 1;
    const parsedLimit = limit ? Number(limit) : 20;

    if (
        Number.isNaN(parsedPage) ||
        parsedPage < 1 ||
        Number.isNaN(parsedLimit) ||
        parsedLimit < 1 ||
        parsedLimit > 100
    ) {
        throw new Error('Invalid pagination parameters');
    }

    return null;
};
