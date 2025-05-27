import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";

var settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
        ,
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
export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#EF7F8F',
            padding: '30px 10px',
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            footer
        </footer>
    );
}

if (document.getElementById("footer_app")) {
    ReactDOM.render(<Footer />, document.getElementById("footer_app"));
}
