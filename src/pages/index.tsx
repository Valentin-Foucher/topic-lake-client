import Login from '@/components/Login';
import { useAppSelector } from '../app/hooks'
import CreateUser from '@/components/CreateUser';
import Logout from '@/components/Logout';
import TopicTreeView from '@/components/TopicTreeView/TopicTreeView';
import { OpenAPI } from '@/clients/api';


export default function Home() {
    const token = useAppSelector(state => state.bearerToken.value )

    const apiClientHeaders = (OpenAPI.HEADERS as Record<string, string>)
    if (token) {
        apiClientHeaders['Authorization'] = `Bearer ${token}`
    } else {
        delete apiClientHeaders['Authorization']
    }

    if (!token) {
        return (
            <>
                <CreateUser />
                <Login />
            </>
        );
    }

    return (
        <div className='container'>
            <Logout />
            <TopicTreeView />
        </div>
    );
}