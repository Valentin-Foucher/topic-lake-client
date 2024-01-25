import { ApiError, ConnectionService, Topic, TopicsService, User } from '@/clients/api';
import { CSSProperties, use, useEffect, useRef, useState } from 'react';
import { NodeApi, Tree, TreeApi } from 'react-arborist';
import { AiTwotonePlusSquare } from "react-icons/ai";
import { MdArrowDropDown, MdArrowRight, MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { bearerTokenSlice } from '@/app/store';
import { title } from '@/app/strings';
import './TopicTreeView.css'

const DEFAULT_TOPIC_NAME = 'new topic'

const { logout } = bearerTokenSlice.actions;

export default function TopicTreeView({ user }: { user: User | undefined }) {
    const [topicsTree, setTopicsTree] = useState<Topic[]>();
    const [createdTopicId, setCreatedTopicId] = useState<number | null>()
    const [error, setError] = useState<string | null>()
    const dispatch = useAppDispatch();
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
        .catch((err: ApiError) => {
            if (err.status === 401) {
                ConnectionService.logoutApiV1LogoutPost().then(_ => dispatch(logout()))
            }
        })
    }

    const createTopic = () => {
        if (!treeRef.current) {
            return
        }

        const parentTopicId = treeRef.current.selectedNodes[0] ? treeRef.current.selectedNodes[0].data.id : null
        let futureName = DEFAULT_TOPIC_NAME
        let automaticNameExtension = 0

        const parentNode = parentTopicId ? getNodeById(parentTopicId) : treeRef.current.root
        parentNode?.openParents()
        parentNode?.open()

        const availableAliases = new Array((parentNode?.children?.length ?? 0) + 1).fill(true)
        parentNode?.children?.forEach(element => {
            const match = element.data.content.match(new RegExp(`^${DEFAULT_TOPIC_NAME}(\\s\\((?<count>\\d+)\\))?`))
            if (match) {
                const index = match?.groups?.count ? parseInt(match?.groups.count) : 0
                availableAliases[index] = false
            }
        })
        for (let i = 0; i < availableAliases.length; i++) {
            if (availableAliases[i]) {
                automaticNameExtension = i
                break
            }
        }

        if (automaticNameExtension > 0) {
            futureName += ` (${automaticNameExtension})`
        }

        TopicsService.createTopicApiV1TopicsPost(
            {
                requestBody: {
                    content: futureName,
                    parent_topic_id: parentTopicId
                }
            }
        ).then((response) => {
            updateTopicsTree()
            setCreatedTopicId(response.id)
        }).catch((err: ApiError) => {
            if (err.status === 401) {
                ConnectionService.logoutApiV1LogoutPost().then(_ => dispatch(logout()))
            }
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
                        minLength={4}
                        maxLength={256}
                        onFocus={(e) => e.currentTarget.select()}
                        onBlur={() => node.reset()}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                node.reset()
                            }
                            else if (e.key === "Enter") {
                                if (e.currentTarget.value.length < 4 || e.currentTarget.value.length > 256) {
                                    node.reset()
                                    return
                                }
                                TopicsService.updateTopicApiV1TopicsTopicIdPut({
                                    topicId: node.data.id,
                                    requestBody: {
                                        content: e.currentTarget.value,
                                        parent_topic_id: node.data.parent_topic_id ?? null
                                    }
                                }).then(() => {
                                    updateTopicsTree()
                                    node.reset()
                                }).catch((err: ApiError) => {
                                    if (err.status === 401) {
                                        ConnectionService.logoutApiV1LogoutPost().then(_ => dispatch(logout()))
                                    }
                                })
                            }
                        }}
                    />
                ) : (
                    <pre>
                        {title(node.data.content)}
                    </pre>
                )}
                {(node.data.user_id === user?.id || user?.admin) &&
                <div className="actions">
                    <button onClick={() => node.edit()} title="Rename...">
                        <MdEdit />
                    </button>
                    <button onClick={() => TopicsService.deleteTopicApiV1TopicsTopicIdDelete({ topicId: node.data.id })
                                            .then(() => updateTopicsTree())} title="Delete">
                        <RxCross2 />
                    </button>

                </div>
                }
            </div>
        );
    }

    return (
        <div>
            <div className="actions create-topic">
                <button onClick={createTopic} title="New Topic...">
                    <AiTwotonePlusSquare size={25} />
                </button>
            </div>
            <Tree
                data={topicsTree}
                ref={treeRef}
                disableMultiSelection={true}
                selectionFollowsFocus={true}
                indent={12}
                rowHeight={20}
                paddingBottom={50}
                width={300}
                idAccessor={(t: Topic) => t.id.toString()}
                childrenAccessor={(t: Topic) => t.sub_topics ?? []}
                onMove={({ dragIds, parentId, index }) => {
                    const id = parseInt(dragIds[0])
                    const node = getNodeById(id)
                    const parsedParentId = parentId ? parseInt(parentId) : null
                    if (!node) {
                        return
                    }
                    TopicsService.updateTopicApiV1TopicsTopicIdPut({
                        topicId: id,
                        requestBody: {
                            content: node.data.content,
                            parent_topic_id: parsedParentId
                        }
                    }).then(() => {
                        updateTopicsTree()
                    }).catch((err: ApiError) => {
                        if (err.status === 401) {
                            ConnectionService.logoutApiV1LogoutPost().then(_ => dispatch(logout()))
                        }
                    })
                }}
            >
                {Node}
            </Tree>
            <div className="error">
                {error}
            </div>
        </div>
    );
}
