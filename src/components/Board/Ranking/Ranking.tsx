import { Item, ItemsService, Topic } from "@/clients/api";
import { useEffect, useState } from "react";
import ItemsList from "./ItemsList/ItemsList";
import './Ranking.css'

export default function Ranking({ topic }: { topic: Topic }) {
    const [items, setItems] = useState<Item[]>()
    const [reordering, setReordering] = useState<boolean>()
    const [newItemContent, setNewItemContent] = useState<string>("")

    useEffect(() => {
        refreshItemsList()
    }, [topic])

    useEffect(() => {
        if (reordering) {
            refreshItemsList()
            setReordering(false)
        }
    }, [reordering])

    const refreshItemsList = () => {
        ItemsService.listItemsApiV1TopicsTopicIdItemsGet({ topicId: topic.id })
        .then((response) => setItems(response.items))
    }

    return (
        <>
            <div className="board-header">
                Ranking
            </div>
            <div className="board-content ranking">
                {items &&
                <ItemsList
                    items={items}
                    setItems={setItems}
                    setReordering={setReordering}
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
                            onClick={() => newItemContent.length >= 4 &&
                                ItemsService.createItemApiV1TopicsTopicIdItemsPost({ topicId: topic.id, requestBody: { content: newItemContent, rank: 1_000_000 }})
                                .then(() => {
                                    setNewItemContent('')
                                    refreshItemsList()
                                })}>
                            Add (4-256 characters)
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
