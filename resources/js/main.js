import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import ExpoEmprendedores from "./ExpoEmprendedores";


if (document.getElementById('expo-emprendedores-spa')) {
    ReactDOM.render(
        <BrowserRouter>
            <ExpoEmprendedores />
        </BrowserRouter>, document.getElementById('expo-emprendedores-spa'));
}
