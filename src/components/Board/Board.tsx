import { Topic } from "@/clients/api";
import Ranking from "./Ranking/Ranking";
import SubTopics from "./SubTopics/SubTopics";
import './Board.css'

export default function Board({ topic, selectTopic }: { topic: Topic | undefined, selectTopic: (topic: Topic) => void }) {
    return (
        <>
            {topic &&
                <>
                        <div className="left board-section">
                            <Ranking
                                topic={topic}
                            />
                        </div>
                        <div className="right board-section">
                            <SubTopics
                                topic={topic}
                                selectTopic={selectTopic}
                            />
                        </div>
                </>
            }
        </>
    );
}
