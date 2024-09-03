import React from "react";

export default function ContentListItem({content}) {
    return (
        <div>
            <p>
                <img src={content.src} alt={content.description} width="100px"/>
            </p>
        </div>
    )
}