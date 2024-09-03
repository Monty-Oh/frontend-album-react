import ContentList from "./ContentList";
import {useSelector} from "react-redux";
import {selectActiveTagData} from "../../store/content";

export default function Content() {
    const groupedData = useSelector(state => selectActiveTagData(state));

    return (
        <div style={{paddingTop: 100}}>
            {Object.entries(groupedData).map(([tag, contents]) => <ContentList key={tag} contents={contents}/>)}
        </div>
    )
}