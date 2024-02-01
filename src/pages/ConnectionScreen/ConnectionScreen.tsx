import CreateUser from "./CreateUser/CreateUser";
import Login from "./Login/Login";
import './ConnectionScreen.css'

export default function ConnectionScreen() {
    return (
        <div className='container'>
            <div className='connection-menu'>
                <Login />
                <CreateUser />
            </div>
        </div>
    )
}