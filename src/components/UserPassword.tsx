import { useState } from "react";

export default function UserPassword({ onClick, buttonText, error }: { onClick: (username: string, password: string) => void, buttonText: string, error: string | undefined}) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            <div>
                <input
                    name='username'
                    type='text'
                    placeholder='username'
                    value={username}
                    maxLength={64}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    value={password}
                    maxLength={64}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={() => onClick(username, password)}>{buttonText}</button>
            <div className="error">
                {error}
            </div>
        </>
    );
}