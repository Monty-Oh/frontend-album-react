import "components/tag/Tag.css";
import {store} from "../../store";
import {useDispatch} from "react-redux";

export default function Tag({name, activeTag}) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(store.content.action.setActiveTag(name));
    };

    return (
        <div className="tag-container">
            <button
                className={name === activeTag ? "tag-button-dark" : "tag-button"}
                onClick={handleClick}>
                {name}
            </button>
        </div>
    )
}