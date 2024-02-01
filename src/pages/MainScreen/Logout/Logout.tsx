import { useAppDispatch } from '@/app/hooks'
import { ConnectionService } from '@/clients/api';
import { baseApiCallWrapper } from '@/app/errors';
import { useState } from 'react';
import { bearerTokenSlice } from '@/app/store';
import './Logout.css'

const { logout } = bearerTokenSlice.actions;

export default function Logout() {
    const [error, setError] = useState<string>()
    const dispatch = useAppDispatch();
    const apiCallWrapper = (apiCall: Promise<any>) => baseApiCallWrapper(setError, apiCall)

    const signOut = () => {
        apiCallWrapper(
            ConnectionService.logoutApiV1LogoutPost()
            .then(_ => dispatch(logout()))
        )
    }

    return (
        <>
            <div className='log-out'>
                <button
                    className='action-button'
                    onClick={() => signOut()}
                >
                    Sign out
                </button>
            </div>
            <pre className="error">
                {error}
            </pre>
        </>
    );
}