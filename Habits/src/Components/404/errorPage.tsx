
import { Link } from "react-router";

const NotFound404 = () => {
    return (
        <div className="notfound-wrapper">
            <div className="notfound-container">
                <img
                    src="/404-illustration.png"
                    alt="404"
                    className="notfound-image"
                />
                <h1 className="notfound-title">404 - Страницата не е намерена</h1>
                <p className="notfound-text">
                    Упс! Изглежда, че страницата, която търсиш, не съществува.
                </p>
                <div className="notfound-buttons">
                    <Link to="/" className="profile-button">
                        Обратно към началната
                    </Link>
                    <Link to="/login" className="logout-btn">
                        Вход
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound404;
