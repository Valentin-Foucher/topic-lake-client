import { useState } from "react";
import Board from "./Board/Board";
import Logout from "./Logout/Logout";
import TopicTreeView from "./TopicTreeView/TopicTreeView";
import { Topic, User } from "@/clients/api";
import './MainScreen.css'

export default function MainScreen({ user }: { user: User | undefined }) {
    const [selectedTopic, setSelectedTopic] = useState<Topic>()

    return (
        <div className='container'>
            <div className='separator' />
            <div className='left-menu'>
                <TopicTreeView
                    user={user}
                    selectedTopic={selectedTopic}
                    selectTopic={setSelectedTopic}
                />
                <Logout />
            </div>
            <div className='separator' />
            <div className='separator' />
            <div className='board'>
                <Board
                    topic={selectedTopic}
                    selectTopic={setSelectedTopic}
                />
            </div>
        <div className='separator' />
    </div>
    )
}