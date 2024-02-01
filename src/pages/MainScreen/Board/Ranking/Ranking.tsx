import { Item, ItemsService, Topic } from "@/clients/api";
import { useEffect, useState } from "react";
import ItemsList from "./ItemsList/ItemsList";
import './Ranking.css'
import { baseApiCallWrapper } from "@/app/errors";

export default function Ranking({ topic }: { topic: Topic }) {
    const [items, setItems] = useState<Item[]>()
    const [newItemContent, setNewItemContent] = useState<string>("")
    const [error, setError] = useState<string>('')
    const apiCallWrapper = (apiCall: Promise<any>) => baseApiCallWrapper(setError, apiCall)

    useEffect(() => {
        refreshItemsList()
    }, [topic])

    const refreshItemsList = () => {
        apiCallWrapper(
            ItemsService.listItemsApiV1TopicsTopicIdItemsGet({ topicId: topic.id })
            .then((response) => setItems(response.items))
        )
    }

    const createItem = (topicId: number, content: string) => {
        apiCallWrapper(
            ItemsService.createItemApiV1TopicsTopicIdItemsPost({ topicId, requestBody: { content, rank: 1_000_000 }})
            .then(() => {
                setNewItemContent('')
                refreshItemsList()
            })
        )
    }

    return (
        <>
            <div className="left board-header">
                Ranking
            </div>
            <div className="board-content ranking" onClick={() => setError('')}>
                {items &&
                <ItemsList
                    items={items}
                    setItems={setItems}
                    refreshItemsList={refreshItemsList}
                    setError={setError}
                />}
                <div className="add-item">
                    <div className="centered-add-item">
                        <input
                            className="add-item-input"
                            type="text"
                            minLength={4}
                            maxLength={256}
                            value={newItemContent}
                            placeholder="New item"
                            onChange={(e) => setNewItemContent(e.target.value)}
                        />
                        <button
                            className="action-button add-item-button"
                            onClick={() => createItem(topic.id, newItemContent)}>
                            Add (3-256 characters)
                        </button>

                        <pre className="error">
                            {error}
                        </pre>
                    </div>
                </div>
            </div>
        </>
    );
}
