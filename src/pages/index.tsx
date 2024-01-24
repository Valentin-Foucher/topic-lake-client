import Login from '@/components/Login';
import { useAppSelector } from '../app/hooks'
import CreateUser from '@/components/CreateUser';
import Logout from '@/components/Logout';
import TopicTreeView from '@/components/TopicTreeView/TopicTreeView';


export default function Home() {
    const token = useAppSelector(state => state.bearerToken.value)
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