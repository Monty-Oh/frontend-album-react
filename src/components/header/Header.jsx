import "components/header/Header.css";
import ReactLogo from "components/logo/ReactLogo";

export default function Header() {
    return (
        <div className="header-container">
            <header>
                <ReactLogo/>
            </header>
        </div>
    )
}