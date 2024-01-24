import { ApiError } from "@/clients/api";

export const parseApiError = (e: ApiError): string => {
    let result;
    const { detail } = e.body;
    if (detail instanceof Array) {
        result = detail.map((err: { message: string, field: string, value: any }) => `• ${err.message} (${err.value}) - ${err.field}`).join('\n');
    } else {
        result = detail;
    }
    return result;
}
