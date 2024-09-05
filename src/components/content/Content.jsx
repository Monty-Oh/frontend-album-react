import ContentList from "./ContentList";
import "components/content/Content.css";
import {useSelector} from "react-redux";
import {selectActiveTagData} from "../../store/content";

export default function Content() {
    const groupedData = useSelector(state => selectActiveTagData(state));

    return (
        <div className="content-container">
            {Object.entries(groupedData).map(([tag, contents]) => <ContentList key={tag} tag={tag} contents={contents}/>)}
        </div>
    )
}