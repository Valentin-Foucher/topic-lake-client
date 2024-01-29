import { Topic } from "@/clients/api";
import './SubTopics.css'

export default function SubTopics({ topic, selectTopic }: { topic: Topic, selectTopic: (topic: Topic) => void }) {
    const subTopics = topic.sub_topics ?? [];

    return (
        <>
            <div className="board-header">
                Subtopics
            </div>
            <div className="board-content sub-topics-list">
                {subTopics.map((topic, i) =>
                    <button
                        className='action-button sub-topic'
                        key={i}
                        onClick={() => selectTopic(topic)}
                    >
                        Helo {topic.content}
                    </button>)
                }
            </div>
        </>
    );
}
