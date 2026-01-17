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