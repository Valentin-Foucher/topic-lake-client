/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogInRequest } from '../models/LogInRequest';
import type { LogInResponse } from '../models/LogInResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConnectionService {
    /**
     * Login
     * @returns LogInResponse Successful Response
     * @throws ApiError
     */
    public static loginLoginPost({
        requestBody,
    }: {
        requestBody: LogInRequest,
    }): CancelablePromise<LogInResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static logoutLogoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/logout',
        });
    }
}
