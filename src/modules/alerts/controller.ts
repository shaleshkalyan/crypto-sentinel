import { Request, Response } from 'express';
import { AlertRepository } from './repository';
import { CreateAlertDTO, ListValidationType, PaginationParamsType } from './types';
import { sendSuccess, sendError } from '../../libs/utils';
import { validatePagination, validateAlertId, validateCreateAlert, validateListAlert } from './validator';

/**
 * Create a new price alert
 */
export const createAlert = async (req: Request, res: Response) => {
    try {
        const body = req.body as Partial<CreateAlertDTO>;

        const validationError = validateCreateAlert(body);
        if (validationError) {
            return sendError(res, validationError, null, 400);
        }

        const alert = await AlertRepository.create(body as CreateAlertDTO);

        return sendSuccess(res, 'Alert created successfully', alert, 201);
    } catch (error) {
        return sendError(res, 'Failed to create alert', error);
    }
};

/**
 * List all alerts with pagination.
 */
export const listAlert = async (req: Request, res: Response) => {
    try {
        let defLimit = 10;
        const { page, limit } = req.query as Partial<PaginationParamsType>;

        const validationError = validatePagination(page, limit);

        if (validationError) {
            return sendError(res, validationError, null, 400);
        }
        if (limit) {
            defLimit = limit;
        }

        const offset = (Number(page) - 1) * defLimit;

        const [alerts, total] = await Promise.all([
            AlertRepository.list({}, { limit: defLimit, offset }),
            AlertRepository.count({}),
        ]);

        return sendSuccess(res, 'Alerts fetched successfully', {
            data: alerts,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / defLimit),
            },
        });
    } catch (error: any) {
        return sendError(res, error.message, null, 400);
    }
};

/**
 * List alerts with filters
 */
export const listAlertsWithFilter = async (
    req: Request,
    res: Response
) => {
    try {

        let defLimit = 10;
        const { page, limit, userId, status, orderBy, direction } = req.body as Partial<ListValidationType>;

        const validationError = validateListAlert({ page, limit, userId, status, orderBy, direction });

        if (validationError) {
            return sendError(res, validationError, null, 400);
        }

        if (limit) {
            defLimit = limit;
        }

        const offset = (Number(page) - 1) * defLimit;

        const filters = { userId, status };

        const [alerts, total] = await Promise.all([
            AlertRepository.list(filters, { limit: defLimit, offset }),
            AlertRepository.count(filters),
        ]);

        return sendSuccess(res, 'Alerts fetched successfully', {
            data: alerts,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / defLimit),
            },
        });
    } catch (error: any) {
        return sendError(res, error.message, null, 400);
    }
};

/**
 * DELETE alerts based on id.
 */
export const deleteAlert = async (req: Request, res: Response) => {
    try {
        const validationError = validateAlertId(req.params.id);
        if (validationError) {
            return sendError(res, validationError, null, 400);
        }

        const deleted = await AlertRepository.deleteById(String(req.params.id));

        if (!deleted) {
            return sendError(res, 'Alert not found', null, 404);
        }

        return sendSuccess(res, 'Alert deleted successfully', {
            deleted: true,
            id: deleted.id,
        });
    } catch (error: any) {
        return sendError(res, 'Failed to delete alert', error);
    }
};