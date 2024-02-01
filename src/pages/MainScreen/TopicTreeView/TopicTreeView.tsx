import { Topic, TopicsService, User } from '@/clients/api';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { NodeApi, Tree, TreeApi } from 'react-arborist';
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { title } from '@/app/strings';
import { baseApiCallWrapper } from '@/app/errors';
import './TopicTreeView.css'
import DeleteRename from '@/components/DeleteRename/DeleteRename';
import EditableItem from '@/components/EditableItem/EditableItem';


const DEFAULT_TOPIC_NAME = 'new topic'

export default function TopicTreeView({ user, selectedTopic, selectTopic }: { user: User | undefined, selectedTopic: Topic | undefined, selectTopic: (node: Topic) => void }) {
    const [topicsTree, setTopicsTree] = useState<Topic[]>();
    const [createdTopicId, setCreatedTopicId] = useState<number | null>()
    const [error, setError] = useState<string>()
    const treeRef = useRef<TreeApi<Topic>>(null);
    const apiCallWrapper = (apiCall: Promise<any>) => baseApiCallWrapper(setError, apiCall)

    useEffect(() => {
        updateTopicsTree()
    }, []);

    useEffect(() => {
        if (selectedTopic) {
            onSelect(selectedTopic)
        }
    }, [selectedTopic])

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
        apiCallWrapper(
            TopicsService.listTopicsApiV1TopicsGet()
            .then(response => setTopicsTree(response.topics))
        )
    }

    const updateTopic = (id: number, content: string, parentTopicId: number | null): Promise<false | void> => {
        return apiCallWrapper(
            TopicsService.updateTopicApiV1TopicsTopicIdPut({
                topicId: id,
                requestBody: {
                    content,
                    parent_topic_id: parentTopicId
                }
            }).then(() => {
                updateTopicsTree()
            })
        )
    }

    const createTopic = (content: string, parentTopicId: number | null) => {
        apiCallWrapper(
            TopicsService.createTopicApiV1TopicsPost(
                {
                    requestBody: {
                        content,
                        parent_topic_id: parentTopicId
                    }
                }
            ).then((response) => {
                updateTopicsTree()
                setCreatedTopicId(response.id)
            })
        )
    }

    const deleteTopic = (topicId: number) => {
        apiCallWrapper(
            TopicsService.deleteTopicApiV1TopicsTopicIdDelete({ topicId })
            .then(() => updateTopicsTree())
        )
    }

    const onMove = ({ dragIds, parentId, index }: { dragIds: string[], parentId: string | null, index: number}) => {
        const id = parseInt(dragIds[0])
        const node = getNodeById(id)
        const parsedParentId = parentId ? parseInt(parentId) : null

        if (!node) {
            return
        }
        updateTopic(id, node.data.content, parsedParentId)
    }

    const onSelect = (topic: Topic | null) => {
        if (topic) {
            getNodeById(topic.id)?.open()
            selectTopic(topic)
        }
    }

    const getNewTopicName = (parentTopicId: number | null): string => {
        let newTopicName = DEFAULT_TOPIC_NAME
        let automaticNameExtension = 0

        const parentNode = parentTopicId ? getNodeById(parentTopicId) : treeRef.current?.root
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
            newTopicName += ` (${automaticNameExtension})`
        }
        return newTopicName
    }

    const createNewTopic = () => {
        if (!treeRef.current) {
            return
        }
        const parentTopicId = treeRef.current.selectedNodes[0] ? treeRef.current.selectedNodes[0].data.id : null
        const newTopicName = getNewTopicName(parentTopicId)

        createTopic(newTopicName, parentTopicId)
    }

    function Node({ node, style, dragHandle }: { node: NodeApi<Topic>, style: CSSProperties, dragHandle?: (el: HTMLDivElement | null) => void }) {
        const toggleButton = useRef<HTMLElement>(null);

        const hasAncestor = (node: HTMLElement| null | undefined, ancestor: HTMLElement | null): boolean => {
            let res = false
            while (node){
                if (node == ancestor) {
                    res = true
                    break
                }
                node = node?.parentElement
            }
            return res
        }

        return (
            <div
                style={style}
                ref={dragHandle}
                className={`node-container ${node.state.isSelected ? "is-selected" : ""}`}
                onClick={(e) => e.target instanceof HTMLElement && !hasAncestor(e.target, toggleButton.current) && onSelect(node.data)}
            >
                <span
                    ref={toggleButton}
                    onClick={() => node.toggle()}
                >
                    {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
                </span>
                <div className='topic'>
                    <EditableItem
                        isEditing={node.isEditing}
                        reset={() => node.reset()}
                        update={(value) => updateTopic(node.data.id, value, node.data.parent_topic_id ?? null)}
                        content={node.data.content}
                    />
                </div>
                {(node.data.user_id === user?.id || user?.admin) &&
                <DeleteRename
                    renameModel={() => node.edit()}
                    deleteModel={() => deleteTopic(node.data.id)}
                />}
            </div>
        );
    }

    return (
        <div onClick={() => setError('')}>
            <Tree
                data={topicsTree}
                ref={treeRef}
                disableMultiSelection={true}
                selectionFollowsFocus={true}
                indent={12}
                rowHeight={20}
                paddingBottom={50}
                width={300}
                height={500}
                idAccessor={(t: Topic) => t.id.toString()}
                childrenAccessor={(t: Topic) => t.sub_topics ?? []}
                onMove={onMove}
            >
                {Node}
            </Tree>
            <pre className="error">
                {error}
            </pre>
            <div className='add-topic-wrapper'>
                <button
                        className="action-button"
                        onClick={createNewTopic}
                        title="New Topic..."
                    >
                        Add (3-256 characters)
                </button>
            </div>
        </div>
    );
}
