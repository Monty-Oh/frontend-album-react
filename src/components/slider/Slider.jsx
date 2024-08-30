import "components/slider/Slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SliderContent from "./SliderContent";

export default function Slider({tag, contents}) {
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
                        <SliderContent key={item.id} item={item}/>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
