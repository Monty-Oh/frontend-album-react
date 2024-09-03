import React from "react";
import {useSelector} from "react-redux";
import {selectActiveTagData} from "../../store/content";
import Header from "../../components/header/Header";
import ContentList from "../../components/content/ContentList";

export default function Main() {
    const groupedData = useSelector(state => selectActiveTagData(state));
    console.log(groupedData);
    return (
        <div className="main-container">
            <Header/>
            <div style={{paddingTop: 100}}>
                {Object.entries(groupedData).map(([tag, contents]) => <ContentList key={tag} contents={contents}/>)}
            </div>
        </div>
    )
}