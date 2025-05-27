import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Header() {

    return (
        <>
            <div style={{ 
                width: "100%", 
                height: "10vw",
                margin: 0, 
                padding: 0,
                position: "relative",
                background: "blue"
            }}>
                Header
            </div>
        </>
    );
}
if (document.getElementById("header_app")) {
    ReactDOM.render(<Header />, document.getElementById("header_app"));
}
