import Login from '@/components/Login/Login';
import { useAppSelector } from '../app/hooks'
import CreateUser from '@/components/CreateUser';
import Logout from '@/components/Logout/Logout';
import TopicTreeView from '@/components/TopicTreeView/TopicTreeView';
import { OpenAPI, User, UsersService } from '@/clients/api';
import './index.css'
import { useEffect, useState } from 'react';


export default function Home() {
    const [user, setUser] = useState<User>();

    const token = useAppSelector(state => state.bearerToken.value?.token)
    const userId = useAppSelector(state => state.bearerToken.value?.user_id)

    useEffect(() => {
        if (token) {
            UsersService
            .getUserApiV1UsersSelfGet()
            .then(response => setUser(response.user))
        }
    }, [token])

    const apiClientHeaders = (OpenAPI.HEADERS as Record<string, string>)
    if (token) {
        apiClientHeaders['Authorization'] = `Bearer ${token}`
    } else {
        delete apiClientHeaders['Authorization']
    }

    if (!token) {
        return (
            <div className='left-menu'>
                <CreateUser />
                <Login />
            </div>
        );
    }

    return (
        <div className='container'>
            <div className='left-menu'>
                <TopicTreeView user={user} />
                <Logout />
            </div>
            <div className='board'>

            </div>
        </div>
    );
}