/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateItemRequest } from '../models/CreateItemRequest';
import type { GetItemResponse } from '../models/GetItemResponse';
import type { ListItemsResponse } from '../models/ListItemsResponse';
import type { UpdateItemRequest } from '../models/UpdateItemRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ItemsService {
    /**
     * List Items
     * @returns ListItemsResponse Successful Response
     * @throws ApiError
     */
    public static listItemsApiV1TopicsTopicIdItemsGet({
        topicId,
    }: {
        topicId: number,
    }): CancelablePromise<ListItemsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics/{topic_id}/items',
            path: {
                'topic_id': topicId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Item
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createItemApiV1TopicsTopicIdItemsPost({
        topicId,
        requestBody,
    }: {
        topicId: number,
        requestBody: CreateItemRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/topics/{topic_id}/items',
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
    /**
     * Get Item
     * @returns GetItemResponse Successful Response
     * @throws ApiError
     */
    public static getItemApiV1TopicsTopicIdItemsItemIdGet({
        itemId,
    }: {
        itemId: number,
    }): CancelablePromise<GetItemResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics/{topic_id}/items/{item_id}',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Item
     * @returns void
     * @throws ApiError
     */
    public static deleteItemApiV1TopicsTopicIdItemsItemIdDelete({
        itemId,
    }: {
        itemId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/topics/{topic_id}/items/{item_id}',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Item
     * @returns void
     * @throws ApiError
     */
    public static updateItemApiV1TopicsTopicIdItemsItemIdPut({
        itemId,
        requestBody,
    }: {
        itemId: number,
        requestBody: UpdateItemRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/topics/{topic_id}/items/{item_id}',
            path: {
                'item_id': itemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
