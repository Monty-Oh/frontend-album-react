import React from "react";
import "./SliderContent.css";

export default function SliderContent({item}) {
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