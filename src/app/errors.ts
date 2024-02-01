import { ApiError } from "@/clients/api";

const parseApiError = (e: ApiError): string => {
    let result;
    const { detail } = e.body;
    if (detail instanceof Array) {
        result = detail.map((err: { message: string, field: string, value: any }) => `• ${err.message} (${err.value}) - ${err.field}`).join('\n');
    } else {
        result = detail;
    }
    return result;
}

export const baseApiCallWrapper = async (setError: (error: string) => void, apiCall: Promise<any>): Promise<any> => {
    setError('')
    try {
        return await apiCall;
    } catch (error) {
        return error instanceof ApiError && setError(parseApiError(error));
    }
}