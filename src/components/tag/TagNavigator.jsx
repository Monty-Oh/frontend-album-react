import Tag from "./Tag";
import "components/tag/TagNavigator.css";
import {useSelector} from "react-redux";
import {store} from "../../store";

export default function TagNavigator() {
    const tagList = useSelector(state => store.content.selector.selectTagList(state));
    const activeTag = useSelector(state => state.content.activeTag);
    return (
        <div className="tag-navigator-container">
            {tagList.map((tag) => <Tag key={tag} name={tag} activeTag={activeTag}/>)}
        </div>
    )
}