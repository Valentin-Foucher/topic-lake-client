/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Topic = {
    id: number;
    content: string;
    user_id: number;
    parent_topic_id?: (number | null);
    sub_topics?: (Array<Topic> | null);
};

