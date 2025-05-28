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
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                maxWidth: '1200px',
                gap: '40px',
                position: 'relative'
            }}>
                {/* Contenedor izquierdo */}
                <div style={{
                    flex: '1',
                    minWidth: '300px',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    <img
                        src="assets/images/foro2025/LOGOTIPO FORO PNG-02.png"
                        alt="Expo emprendedores 2024"
                        style={{
                            maxWidth: '80%',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </div>

                {/* Contenedor derecho */}
                <div style={{
                    flex: '1',
                    minWidth: '300px',
                    textAlign: 'center'
                }}>
                    <img
                        src="assets/images/2025/FOOTER-LOGOS.png"
                        alt="H. XVII Ayuntamiento de La Paz"
                        style={{
                            maxWidth: '80%',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </div>
            </div>
        </footer>
    );
}

if (document.getElementById("footer_app")) {
    ReactDOM.render(<Footer />, document.getElementById("footer_app"));
}