import Tag from "./Tag";
import "components/tag/TagNavigator.css";
import {useSelector} from "react-redux";
import {selectTags} from "../../store/content";

export default function TagNavigator() {
    const tagObject = useSelector(state => selectTags(state));
    return (
        <div className="tag-navigator-container">
            {Object.keys(tagObject).map((key) => <Tag key={key} name={key} selected={tagObject[key]}/>)}
        </div>
    )
}