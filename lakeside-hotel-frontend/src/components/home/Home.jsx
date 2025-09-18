import { useLocation, useNavigate } from "react-router-dom"
import HotelServices from "../common/HotelServices"
import Parallex from "../common/Parallex"
import RoomCarousel from "../common/RoomCarousel"
import RoomSearch from "../common/RoomSearch"
import MainHeader from "../layout/MainHeader"
import { useEffect, useState } from "react"

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [message, setMessage] = useState(location.state?.message || "");
    const [messageType, setMessageType] = useState(location.state?.type || "");
    const [currentUser, setCurrentUser] = useState(
        sessionStorage.getItem("showLoginMessage") === "true"
            ? localStorage.getItem("userId") || ""
            : ""
    );

    useEffect(() => {
        if (location.state?.message) {
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    useEffect(() => {
        if (message || currentUser) {
            const timer = setTimeout(() => {
                setMessage("");
                setMessageType("");
                setCurrentUser("");
                sessionStorage.removeItem("showLoginMessage");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [message, currentUser]);

    return (
        <section>
            {
                message && (
                    <div
                        className={`alert text-center fw-bold mx-5 ${messageType === "error"
                            ? "alert-danger"
                            : messageType === "warning"
                                ? "alert-warning"
                                : "alert-success"
                            }`}
                        role="alert"
                    >
                        {message}
                    </div>
                )
            }

            {
                currentUser && (
                    <div className="alert alert-info text-center fw-bold mx-5" role="alert">
                        You are logged in as {currentUser}
                    </div>
                )
            }

            <MainHeader />

            <section className="container">
                <RoomSearch />
                <RoomCarousel />
                <Parallex />
                <RoomCarousel />
                <HotelServices />
                <Parallex />
                <RoomCarousel />
            </section>
        </section >
    )
}

export default Home