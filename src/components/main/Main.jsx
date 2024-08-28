import React from "react";
import {useSelector} from "react-redux";
import {selectGroupedData} from "../../store/content";
import MainSlider from "./MainSlider";
import MainHeader from "./MainHeader";

export default function Main() {
    const groupedData = useSelector(state => selectGroupedData(state));
    return (
        <div className="main-container">
            <>
                <MainHeader />
            </>
            {Object.entries(groupedData).map(([tag, contents]) => (
                    <MainSlider key={tag} tag={tag} contents={contents}/>
            ))}
        </div>
    )
}