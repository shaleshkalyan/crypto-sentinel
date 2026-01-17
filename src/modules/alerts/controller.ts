import { Request, Response } from 'express';
import { AlertRepository } from './repository';
import { CreateAlertDTO } from './types';
import { sendSuccess, sendError } from '../../libs/utils';
import { validateCreateAlert } from './validator';

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