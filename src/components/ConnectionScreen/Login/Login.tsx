import { useAppDispatch } from '@/app/hooks'
import { ConnectionService } from '@/clients/api';
import UserPassword from '../CreateUser/UserPassword/UserPassword';
import { parseApiError } from '@/app/errors';
import { useState } from 'react';
import { bearerTokenSlice } from '@/app/store';

const { login } = bearerTokenSlice.actions;

export default function Login() {
    const [error, setError] = useState<string>()
    const dispatch = useAppDispatch();

    return (
        <div>
            Sign in
            <UserPassword
                onClick={(username: string, password: string) => {
                    ConnectionService.loginApiV1LoginPost({ requestBody: { username, password }})
                        .then(response => {
                            dispatch(login(response))
                        }).catch(e => {
                            setError(parseApiError(e))
                        })
                }}
                buttonText='Sign in'
                error={error}
            />
        </div>
    );
}