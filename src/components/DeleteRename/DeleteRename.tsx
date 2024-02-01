import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import './DeleteRename.css'

export default function DeleteRename ({ renameModel, deleteModel }: { renameModel: () => void, deleteModel: () => void }) {
    return (
        <div className="actions">
            <button onClick={renameModel} title="Rename...">
                <MdEdit />
            </button>
            <button onClick={deleteModel} title="Delete">
                <RxCross2 />
            </button>
        </div>
    )
}