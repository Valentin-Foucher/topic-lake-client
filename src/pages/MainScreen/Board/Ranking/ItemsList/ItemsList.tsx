import { Item, ItemsService, UpdateItemRequest } from "@/clients/api";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CSSProperties, useState } from "react";
import DeleteRename from "@/components/DeleteRename/DeleteRename";
import { baseApiCallWrapper } from "@/app/errors";
import EditableItem from "@/components/EditableItem/EditableItem";
import './ItemsList.css'


export default function ItemsList({ items, setItems, refreshItemsList, setError }: { items: Item[], setItems: (items: Item[]) => void, refreshItemsList: () => void, setError: (error: string) => void }) {
    const [isEditing, setEditing] = useState<boolean>(false)

    const apiCallWrapper = (apiCall: Promise<void>) => baseApiCallWrapper(setError, apiCall)

    const updateItem = (item: Item, updateItemBody: UpdateItemRequest): Promise<void> => {
        return apiCallWrapper(
            ItemsService.updateItemApiV1TopicsTopicIdItemsItemIdPut({ itemId: item.id, requestBody: updateItemBody })
            .then(() => refreshItemsList())
        )
    }

    const deleteItem = (itemId: number) => {
        apiCallWrapper(
            ItemsService.deleteItemApiV1TopicsTopicIdItemsItemIdDelete({ itemId })
            .then(() => refreshItemsList())
        )
    }

    const onDragEnd = ({ source, destination }: { source: { index: number, droppableId: string }, destination: { index: number, droppableId: string } }) => {
        if (!destination) {
            return
        }
        const movedItem = items[source.index]
        setItems(reorderItems(items, source.index, destination.index))
        updateItem(movedItem, { content: movedItem.content, rank: destination.index + 1 })
    }

    const reorderItems = (items: Item[], startIndex: number, endIndex: number) => {
        const result = Array.from(items);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };

    return (
        // @ts-ignore
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div className="items-list" ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, i) =>
                            <Draggable
                                key={item.id}
                                index={i}
                                draggableId={item.id.toString()}
                            >
                                {(provided, snapshot) => {
                                    const style: CSSProperties = {}
                                    if (snapshot.isDragging) {
                                        style['backgroundColor'] = 'var(--secondary-bg-color)'
                                    }
                                    return (
                                        <>
                                        <div
                                            className="item"
                                            key={i}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                                ...style
                                            }}
                                        >
                                            <EditableItem
                                                isEditing={isEditing}
                                                reset={() => setEditing(false)}
                                                update={(value: string) => updateItem(item, {content: value, rank: item.rank }).then(() => setEditing(false))}
                                                content={`${item.rank}. ${item.content}`}
                                            />
                                            <DeleteRename
                                                renameModel={() => setEditing(true)}
                                                deleteModel={() => deleteItem(item.id)}
                                            />
                                        </div>
                                    </>
                                )}}
                            </Draggable>)
                        }
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}