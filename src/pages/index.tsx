import Login from '@/components/Login/Login';
import { useAppSelector } from '../app/hooks'
import CreateUser from '@/components/CreateUser';
import Logout from '@/components/Logout/Logout';
import TopicTreeView from '@/components/TopicTreeView/TopicTreeView';
import { OpenAPI, Topic, User, UsersService } from '@/clients/api';
import './index.css'
import { use, useEffect, useState } from 'react';
import Board from '@/components/Board/Board';


export default function Home() {
    const [user, setUser] = useState<User>();
    const [selectedTopic, setSelectedTopic] = useState<Topic>()

    const token = useAppSelector(state => state.bearerToken.value?.token)

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
                <TopicTreeView
                    user={user}
                    selectedTopic={selectedTopic}
                    selectTopic={setSelectedTopic}
                />
                <Logout />
            </div>
            <div className='board'>
                <Board
                    topic={selectedTopic}
                    selectTopic={setSelectedTopic}
                />
            </div>
        </div>
    );
}