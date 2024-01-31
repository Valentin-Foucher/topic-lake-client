import { useAppDispatch, useAppSelector } from '../app/hooks'
import { ApiError, ConnectionService, OpenAPI, User, UsersService } from '@/clients/api';
import { useEffect, useState } from 'react';
import { bearerTokenSlice } from '@/app/store';
import ConnectionScreen from '@/components/ConnectionScreen/ConnectionScreen';
import MainScreen from '@/components/MainScreen/MainScreen';
import './index.css'


const { logout } = bearerTokenSlice.actions;

export default function Home() {
    const [user, setUser] = useState<User>();
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.bearerToken.value?.token)

    useEffect(() => {
        if (token) {
            UsersService
            .getUserApiV1UsersSelfGet()
            .then(response => setUser(response.user))
            .catch((err: ApiError) => {
                if (err.status === 401) {
                    ConnectionService.logoutApiV1LogoutPost().then(_ => dispatch(logout()))
                }
            })
        }
    }, [token])

    const apiClientHeaders = (OpenAPI.HEADERS as Record<string, string>)
    if (token) {
        apiClientHeaders['Authorization'] = `Bearer ${token}`
    } else {
        delete apiClientHeaders['Authorization']
    }

    if (!token) {
        return <ConnectionScreen />
    }

    return <MainScreen user={user} />
}