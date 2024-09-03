import React from "react";
import ContentListItem from "./ContentListItem";

export default function ContentList({contents}) {
    return (
        <div>
            {contents.map((content) => <ContentListItem key={content.id} content={content} />)}
        </div>
    )
}