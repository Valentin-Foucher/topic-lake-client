import { title } from "@/app/strings"

export default function EditableItem({ isEditing, reset, update, content }: { isEditing: boolean, reset: () => void, update: (value: string) => Promise<any>, content: string }) {
    return (
        <>
            {isEditing ? (
                <input
                    type="text"
                    autoFocus
                    minLength={4}
                    maxLength={256}
                    onFocus={(e) => e.currentTarget.select()}
                    onBlur={() => reset()}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            reset()
                        }
                        else if (e.key === "Enter") {
                            if (e.currentTarget.value.length < 4 || e.currentTarget.value.length > 256) {
                                reset()
                            }
                            update(e.currentTarget.value.trim()).then(() => reset())
                        }
                    }}
                />
            ) : (
                <pre>
                    {title(content)}
                </pre>
            )}
        </>
    )
}