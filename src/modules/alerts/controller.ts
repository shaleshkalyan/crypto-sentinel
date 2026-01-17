import { Request, Response } from 'express';
import { AlertService } from '../../services/alert.service';
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

        const alert = await AlertService.createAlert(
            body as CreateAlertDTO
        );

        return sendSuccess(
            res,
            'Alert created successfully',
            alert,
            201
        );
    } catch (error) {
        return sendError(res, 'Failed to create alert', error);
    }
};

/**
 * List all alerts with pagination.
 */
export const listAlert = async (req: Request, res: Response) => {
    try {
        const { page, limit } =
            req.query as Partial<PaginationParamsType>;

        const validationError = validatePagination(page, limit);
        if (validationError) {
            return sendError(res, validationError, null, 400);
        }

        const result = await AlertService.listAlerts({
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        });

        return sendSuccess(res, 'Alerts fetched successfully', {
            data: result.alerts,
            meta: result.meta,
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
        const body = req.body as Partial<ListValidationType>;

        const validationError = validateListAlert(body);
        if (validationError) {
            return sendError(res, validationError, null, 400);
        }

        const result =
            await AlertService.listAlertsWithFilter(
                body as ListValidationType
            );

        return sendSuccess(res, 'Alerts fetched successfully', {
            data: result.alerts,
            meta: result.meta,
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

        const deleted = await AlertService.deleteAlert(
            String(req.params.id)
        );

        return sendSuccess(res, 'Alert deleted successfully', {
            deleted: true,
            id: deleted.id,
        });
    } catch (error: any) {
        return sendError(
            res,
            error.message || 'Failed to delete alert',
            null,
            error.message === 'Alert not found' ? 404 : 500
        );
    }
};