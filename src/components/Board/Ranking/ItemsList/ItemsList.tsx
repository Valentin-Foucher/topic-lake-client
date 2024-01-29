import { Item } from "@/clients/api";

export default function ItemsList({ items }: { items: Item[] }) {
    return (
        <>
            {items.map((item, i) =>
                <div key={i}>
                    {item.rank}. {item.content}
                </div>)
            }
        </>
    );
}