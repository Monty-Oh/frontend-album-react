import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MainSlider.css";
import MainSliderContent from "./MainSliderContent";

export default function MainSlider({tag, contents}) {
    const settings = {
        arrows: true,
        dots: true,
        speed: 500,
        slidesToShow: 3,
        infinite: false,
        initialSlide: 0,
    };

    return (
        <div className="slider-container">
            <div className="tag">
                <h4>#{tag}</h4>
            </div>
            <div className="slider">
                <Slider {...settings}>
                    {contents.map((item) => (
                        <MainSliderContent key={item.id} item={item}/>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
