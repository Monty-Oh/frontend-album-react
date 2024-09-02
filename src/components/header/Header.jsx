import "components/header/Header.css";
import ReactLogo from "components/logo/ReactLogo";
import TagNavigator from "../tag/TagNavigator";

export default function Header() {
    return (
        <div className="header-container">
            <header>
                <div className="header-container">
                    <ReactLogo/>
                    <TagNavigator />
                </div>
            </header>
        </div>
    )
}