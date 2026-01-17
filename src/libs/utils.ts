import { Response } from 'express';
import { ApiResponse } from './types';

/**
 * Universal success response 
 */
export const sendSuccess = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200
): Response<ApiResponse<T>> => {
  const payload: ApiResponse<T> = {
    responseStatus: 'success',
    message,
    data,
  };

  return res.status(statusCode).json(payload);
};

/**
 * Universal error response
 */
export const sendError = <E = unknown>(
  res: Response,
  message: string,
  error: E,
  statusCode = 500
): Response<ApiResponse<E>> => {
  const payload: ApiResponse<E> = {
    responseStatus: 'error',
    message
  };
  
  return res.status(statusCode).json(payload);
};

/**
 * Utility guard for condition enum
 */
export const isValidCondition = (value: unknown): value is 'ABOVE' | 'BELOW' =>
value === 'ABOVE' || value === 'BELOW';

/**
 * Utility guard for unique id.
 */
export const isValidUUID = (value: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
};
