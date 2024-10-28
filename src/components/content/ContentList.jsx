import React from "react";
import "components/content/ContentList.css";
import ContentListItem from "./ContentListItem";

export default function ContentList({tag, contents}) {
    return (
        <div>
            <div className="list-name-container">
                <h3>{tag}</h3>
            </div>
            <div className="content-section-container">
                {contents.map((content) => <ContentListItem key={content.id} content={content} />)}
            </div>
        </div>
    )
}