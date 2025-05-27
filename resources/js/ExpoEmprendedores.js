import React from "react";
import ReactDOM from "react-dom";
import UserState from "./context/User/UserState";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import InternalPage from "./pages/InternalPages/InternalPage";

const ExpoEmprendedores = () => {
    return (
        <UserState>
            <Router basename="/">
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/:page_name" element={<InternalPage />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />} //this is a way to redirect
                    />
                </Routes>
            </Router>
        </UserState>
    );
};

export default ExpoEmprendedores;

if (document.getElementById("expo-emprendedores-spa")) {
    ReactDOM.render(
        <ExpoEmprendedores />,
        document.getElementById("expo-emprendedores-spa")
    );
}
