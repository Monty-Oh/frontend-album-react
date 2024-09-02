import "components/logo/ReactLogo.css";
import logo from "assets/logo.png";

export default function ReactLogo() {
    return (
        <div id="image-container">
            <div id="logo-container">
                <img id="react-logo-image" src={logo} alt="react image logo"/>
                <div id="react-log-text">
                    ALBUM
                </div>
            </div>
        </div>
    )
}