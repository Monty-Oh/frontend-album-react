import React from "react";
import "./MainSliderContent.css";

export default function MainSliderContent({item}) {
    return (
        <div className="content-container">
            <div className="img-body">
                <img src={item.src} alt={item.description}/>
            </div>
            <div>
                <h2>{item.id}</h2>
                <p>test description</p>
            </div>
        </div>
    )
}