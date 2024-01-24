import { Topic, TopicsService } from '@/clients/api';
import { CSSProperties, use, useEffect, useRef, useState } from 'react';
import { NodeApi, Tree, TreeApi } from 'react-arborist';
import { AiTwotonePlusSquare } from "react-icons/ai";
import { MdArrowDropDown, MdArrowRight, MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import './TopicTreeView.css'




export default function TopicTreeView() {
    const [topicsTree, setTopicsTree] = useState<Topic[]>();
    const [createdTopicId, setCreatedTopicId] = useState<number | null>()
    const treeRef = useRef<TreeApi<Topic>>(null);

    useEffect(() => {
        updateTopicsTree()
    }, []);

    useEffect(() => {
        if (!createdTopicId) {
            return
        }
        const newNode = getNodeById(createdTopicId)
        if (newNode) {
            newNode.edit()
            setCreatedTopicId(null)
        }
    }, [topicsTree, createdTopicId]);

    const getNodeById = (id: number): NodeApi<Topic> | null | undefined => {
        return treeRef.current?.at(treeRef.current?.idToIndex[id])
    }

    const updateTopicsTree = () => {
        TopicsService.listTopicsApiV1TopicsGet()
        .then(response => setTopicsTree(response.topics))
    }

    const createTopic = () => {
        if (!treeRef.current) {
            return
        }

        const parentTopicId = treeRef.current.selectedNodes[0] ? treeRef.current.selectedNodes[0].data.id : null
        if (parentTopicId) {
            const parentNode = getNodeById(parentTopicId)
            parentNode?.openParents()
            parentNode?.open()
        }

        TopicsService.createTopicApiV1TopicsPost(
            {
                requestBody: {
                    content: Math.random().toString(24).substring(2, 10),
                    parent_topic_id: parentTopicId
                }
            }
        ).then((response) => {
            updateTopicsTree()
            setCreatedTopicId(response.id)
        })
    }

    function Node({ node, style, dragHandle }: { node: NodeApi<Topic>, style: CSSProperties, dragHandle?: (el: HTMLDivElement | null) => void }) {
        return (
            <div
                style={style}
                ref={dragHandle}
                className={`node-container ${node.state.isSelected ? "is-selected" : ""}`}
                onClick={() => node.isInternal && node.toggle()}
            >
                <span>
                    {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
                </span>
                {node.isEditing ? (
                    <input
                        type="text"
                        autoFocus
                        onFocus={(e) => e.currentTarget.select()}
                        onBlur={() => node.reset()}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                node.reset()
                            }
                            else if (e.key === "Enter") {
                                TopicsService.updateTopicApiV1TopicsTopicIdPut({
                                    topicId: node.data.id,
                                    requestBody: {
                                        content: e.currentTarget.value,
                                        parent_topic_id: node.data.parent_topic_id ?? null
                                    }
                                }).then(() => {
                                    updateTopicsTree()
                                    node.reset()
                                })
                            }
                        }}
                    />
                ) : (
                    <span>{node.data.content}</span>
                )}
                <div className="actions">
                    <button onClick={() => node.edit()} title="Rename...">
                        <MdEdit />
                    </button>
                    <button onClick={() => TopicsService.deleteTopicApiV1TopicsTopicIdDelete({ topicId: node.data.id })
                                            .then(() => updateTopicsTree())} title="Delete">
                        <RxCross2 />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="create-topic">
                <button onClick={createTopic} title="New Topic...">
                    <AiTwotonePlusSquare />
                </button>
            </div>
            <Tree
                data={topicsTree}
                ref={treeRef}
                disableMultiSelection={true}
                selectionFollowsFocus={true}
                width={600}
                height={1000}
                indent={12}
                rowHeight={20}
                paddingBottom={50}
                idAccessor={(t: Topic) => t.id.toString()}
                childrenAccessor={(t: Topic) => t.sub_topics ?? []}
            >
                {Node}
            </Tree>
        </>
    );
}
