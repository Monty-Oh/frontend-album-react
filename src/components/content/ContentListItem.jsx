import React from "react";
import "components/content/ContentListItem.css";

export default function ContentListItem({content}) {
    return (
        <div className="content-list-item-container">
            <div className="item-container">
                        <img src={content.src} alt={content.description}/>
            </div>
        </div>
    )
}