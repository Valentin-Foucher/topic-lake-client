import { useAppDispatch } from '@/app/hooks'
import { ConnectionService, UsersService } from '@/clients/api';
import { baseApiCallWrapper } from '@/app/errors';
import UserPassword from './UserPassword/UserPassword';
import { useState } from 'react';
import { bearerTokenSlice } from '@/app/store';

const { login } = bearerTokenSlice.actions;

export default function CreateUser() {
    const [error, setError] = useState<string>()
    const dispatch = useAppDispatch();
    const apiCallWrapper = (apiCall: Promise<any>) => baseApiCallWrapper(setError, apiCall)

    const createUser = (username: string, password: string) => {
        apiCallWrapper(
            UsersService.createUserApiV1UsersPost({ requestBody: { username, password }})
            .then(_ => {
                ConnectionService.loginApiV1LoginPost({ requestBody: { username, password }})
                    .then(response => dispatch(login(response)))
            })
        )
    }

    return (
        <div onClick={() => setError('')}>
            Create your account
            <UserPassword
                creatingAccount={true}
                onClick={(username: string, password: string) => {
                    createUser(username, password)
                }}
                buttonText='Sign up and log in'
                error={error}
            />
        </div>
    );
}
