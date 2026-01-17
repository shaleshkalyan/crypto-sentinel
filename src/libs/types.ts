export type ApiResponse<T> = {
    responseStatus : 'success' | 'error';
    message: string;
    data ?: T;
};
