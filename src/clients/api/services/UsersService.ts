/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from '../models/CreateUserRequest';
import type { CreateUserResponse } from '../models/CreateUserResponse';
import type { GetUserResponse } from '../models/GetUserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create User
     * @returns CreateUserResponse Successful Response
     * @throws ApiError
     */
    public static createUserUsersPost({
        requestBody,
    }: {
        requestBody: CreateUserRequest,
    }): CancelablePromise<CreateUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User
     * @returns GetUserResponse Successful Response
     * @throws ApiError
     */
    public static getUserUsersSelfGet(): CancelablePromise<GetUserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/self',
        });
    }
}
