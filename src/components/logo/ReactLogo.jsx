import "components/logo/ReactLogo.css";
import logo from "assets/logo.png";

export default function ReactLogo() {
    return (
        <div id="image-container">
            <div id="logo-container">
                <img id="react-logo-image" src={logo} alt="react image logo"/>
                <div id="react-logo-text">
                    <span>ALBUM</span>
                    <span className="react-logo-site-description">
                        (<a href={"https://github.com/Monty-Oh/backend-api-server"} target="_blank">Backend API Server</a> Content 도메인 확인 용도)
                    </span>
                </div>
            </div>
        </div>
    )
}