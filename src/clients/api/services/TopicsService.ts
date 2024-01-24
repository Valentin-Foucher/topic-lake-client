/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTopicRequest } from '../models/CreateTopicRequest';
import type { CreateTopicResponse } from '../models/CreateTopicResponse';
import type { GetTopicResponse } from '../models/GetTopicResponse';
import type { ListTopicsResponse } from '../models/ListTopicsResponse';
import type { UpdateTopicRequest } from '../models/UpdateTopicRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TopicsService {
    /**
     * List Topics
     * @returns ListTopicsResponse Successful Response
     * @throws ApiError
     */
    public static listTopicsApiV1TopicsGet(): CancelablePromise<ListTopicsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics',
        });
    }
    /**
     * Create Topic
     * @returns CreateTopicResponse Successful Response
     * @throws ApiError
     */
    public static createTopicApiV1TopicsPost({
        requestBody,
    }: {
        requestBody: CreateTopicRequest,
    }): CancelablePromise<CreateTopicResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/topics',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Topic
     * @returns GetTopicResponse Successful Response
     * @throws ApiError
     */
    public static getTopicApiV1TopicsTopicIdGet({
        topicId,
    }: {
        topicId: number,
    }): CancelablePromise<GetTopicResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics/{topic_id}',
            path: {
                'topic_id': topicId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Topic
     * @returns void
     * @throws ApiError
     */
    public static deleteTopicApiV1TopicsTopicIdDelete({
        topicId,
    }: {
        topicId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/topics/{topic_id}',
            path: {
                'topic_id': topicId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Topic
     * @returns void
     * @throws ApiError
     */
    public static updateTopicApiV1TopicsTopicIdPut({
        topicId,
        requestBody,
    }: {
        topicId: number,
        requestBody: UpdateTopicRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/topics/{topic_id}',
            path: {
                'topic_id': topicId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
