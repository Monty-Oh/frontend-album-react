import "components/tag/Tag.css";

export default function Tag({name, selected}) {
    return (
        <div className="tag-container">
            <button className="tag-button">
                {name}
            </button>
        </div>
    )
}