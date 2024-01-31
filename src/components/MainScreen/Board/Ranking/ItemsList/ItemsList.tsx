import { Item } from "@/clients/api";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './ItemsList.css'
import { CSSProperties } from "react";


export default function ItemsList({ items, setItems, setReordering }: { items: Item[], setItems: (items: Item[]) => void, setReordering: (reordering: boolean) => void }) {
    const onDragEnd = ({ source, destination }: { source: { index: number, droppableId: string }, destination: { index: number, droppableId: string } }) => {
        if (!destination) return;
        setItems(reorderItems(items, source.index, destination.index));
        setReordering(true)
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
                                        {item.rank}. {item.content}
                                    </div>
                                )}}
                            </Draggable>)
                        }
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}