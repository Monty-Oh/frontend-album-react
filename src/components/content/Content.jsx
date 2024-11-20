import ContentList from "./ContentList";
import "components/content/Content.css";
import {useSelector} from "react-redux";
import {contentSelector} from "../../store";


export default function Content() {
    const groupedData = useSelector(state => contentSelector.selectActiveTagData(state));

    return (
        <div className="content-container">
            {Object.entries(groupedData).map(([tag, contents]) => <ContentList key={tag} tag={tag}
                                                                               contents={contents}/>)}
        </div>
    )
}