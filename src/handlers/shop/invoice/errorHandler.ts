const ERROR_CODES = {
    INVALID_PARAM: { isSuccess: false, status: 400, error: 'Invalid arguments' },
    DATABASE_ERROR: { isSuccess: false, status: 500, error: 'DB Error' },
    CATCH_ERROR: { isSuccess: false, status: 500 },
};

export interface IResponse {
    isSuccess: boolean;
    status?: number;
    error?: string;
    modulo?: string
}

export default ERROR_CODES;
  
