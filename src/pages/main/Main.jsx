import React from "react";
import {useSelector} from "react-redux";
import {selectGroupedData} from "../../store/content";
import Header from "../../components/header/Header";

export default function Main() {
    const groupedData = useSelector(state => selectGroupedData(state));
    return (
        <div className="main-container">
                <Header/>
        </div>
    )
}