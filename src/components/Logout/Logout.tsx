import { useAppDispatch } from '@/app/hooks'
import { ConnectionService } from '@/clients/api';
import { parseApiError } from '@/app/errors';
import { useState } from 'react';
import { bearerTokenSlice } from '@/app/store';
import './Logout.css'

const { logout } = bearerTokenSlice.actions;

export default function Logout() {
    const [error, setError] = useState<string>()
    const dispatch = useAppDispatch();

    return (
        <>
            <div className='log-out'>
                <button
                    className='log-buttons'
                    onClick={() => {
                        ConnectionService.logoutApiV1LogoutPost()
                            .then(_ => dispatch(logout()))
                            .catch(e => {
                                setError(parseApiError(e))
                            })
                    }}
                >
                    Sign out
                </button>
            </div>
            <div className="error">
                {error}
            </div>
        </>
    );
}