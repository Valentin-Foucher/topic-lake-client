import { useAppDispatch } from '@/app/hooks'
import { ConnectionService } from '@/clients/api';
import UserPassword from '../CreateUser/UserPassword/UserPassword';
import { baseApiCallWrapper } from '@/app/errors';
import { useState } from 'react';
import { bearerTokenSlice } from '@/app/store';

const { login } = bearerTokenSlice.actions;

export default function Login() {
    const [error, setError] = useState<string>()
    const dispatch = useAppDispatch();
    const apiCallWrapper = (apiCall: Promise<any>) => baseApiCallWrapper(setError, apiCall)

    const signIn = (username: string, password: string) => {
        apiCallWrapper(
            ConnectionService.loginApiV1LoginPost({ requestBody: { username, password }})
            .then(response => dispatch(login(response)))
        )
    }

    return (
        <div>
            Sign in
            <UserPassword
                creatingAccount={false}
                onClick={(username: string, password: string) => {
                    signIn(username, password)
                }}
                buttonText='Sign in'
                error={error}
            />
        </div>
    );
}