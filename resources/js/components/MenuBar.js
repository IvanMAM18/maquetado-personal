import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuBarWeb from "./modeMenu/MenuBarWeb";
import MenuBarMovil from "./modeMenu/MenuBarMovil";
import axios from "axios";

export default function MenuBar({ userData, darkMode }) {
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? (
        <MenuBarMovil 
            userData={userData} 
            currentPath={location.pathname} 
            darkMode={darkMode} 
        />
    ) : (
        <MenuBarWeb 
            userData={userData} 
            currentPath={location.pathname} 
            darkMode={darkMode} 
        />
    );
}