export default interface IResponse<> {
    isSuccess: boolean;
    status?: number;
    error?: string;
    modulo?: string;
    data?: any[];
}
