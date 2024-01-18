/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTopicRequest } from '../models/CreateTopicRequest';
import type { CreateTopicResponse } from '../models/CreateTopicResponse';
import type { GetTopicResponse } from '../models/GetTopicResponse';
import type { ListTopicsResponse } from '../models/ListTopicsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TopicsService {
    /**
     * List Topics
     * @returns ListTopicsResponse Successful Response
     * @throws ApiError
     */
    public static listTopicsTopicsGet(): CancelablePromise<ListTopicsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/topics',
        });
    }
    /**
     * Create Topic
     * @returns CreateTopicResponse Successful Response
     * @throws ApiError
     */
    public static createTopicTopicsPost({
        requestBody,
    }: {
        requestBody: CreateTopicRequest,
    }): CancelablePromise<CreateTopicResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/topics',
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
    public static getTopicTopicsTopicIdGet({
        topicId,
    }: {
        topicId: number,
    }): CancelablePromise<GetTopicResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/topics/{topic_id}',
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
    public static deleteTopicTopicsTopicIdDelete({
        topicId,
    }: {
        topicId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/topics/{topic_id}',
            path: {
                'topic_id': topicId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
