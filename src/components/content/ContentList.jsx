import React from "react";

export default function ContentList({contents}) {
    return (
        <div>
            {contents.map((content) => (
                <p key={content.id}>
                    <img src={content.src} alt={content.description} width="100px"/>
                </p>
            ))}
        </div>
    )
}