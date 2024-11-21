import ContentList from "./ContentList";
import "components/content/Content.css";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../store";
import {useEffect} from "react";


export default function Content() {
    const groupedData = useSelector(state => store.content.selector.selectActiveTagData(state));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(store.content.fetch.fetchAlbumList({
            tags: []
        }))
    }, [dispatch]);


    return (
        <div className="content-container">
            {Object.entries(groupedData).map(([tag, contents]) => <ContentList key={tag} tag={tag}
                                                                               contents={contents}/>)}
        </div>
    )
}