import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
var settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                dots: false,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 3,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export default function ExpoSpeakers() {
    return (
        <div className="speakers">
            <div className="section-header">
                <img
                    alt="Ponentes"
                    src="assets/images/2024/PONENTES_SECTION.png"
                />
            </div>
            <div className="section-header">
                <img
                    className="mx-auto"
                    style={{width:'50%'}}
                    alt="Ponentes"
                    src="assets/images/2024/PONIENTES_SECTION_2.png"
                />
            </div>
        </div>
    );
}
