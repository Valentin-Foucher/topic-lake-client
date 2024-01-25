import { useAppDispatch } from '@/app/hooks'
import { ConnectionService, UsersService } from '@/clients/api';
import { parseApiError } from '@/app/errors';
import UserPassword from './UserPassword';
import { useState } from 'react';
import { bearerTokenSlice } from '@/app/store';

const { login } = bearerTokenSlice.actions;

export default function CreateUser() {
    const [error, setError] = useState<string>()
    const dispatch = useAppDispatch();

    return (
        <>
            Create your account:
            <UserPassword
                onClick={(username: string, password: string) => {
                    UsersService.createUserApiV1UsersPost({ requestBody: { username, password }})
                        .then(_ => {
                            ConnectionService.loginApiV1LoginPost({ requestBody: { username, password }})
                                .then(response => dispatch(login(response)))
                        }).catch(e => {
                            setError(parseApiError(e))
                        })
                }}
                buttonText='Sign up and log in'
                error={error}
            />
        </>
    );
}
