import { useContext, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import Logout from "../auth/Logout";
import { AuthContext } from "../auth/AuthProvider";

const Navbar = () => {
    const [showAccount, setShowAccount] = useState(false);
    const { user } = useContext(AuthContext);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    }

    const isLoggedIn = user !== null;
    const userRole = localStorage.getItem('userRole');

    return (
        <nav className="navbar navbar-expand-lg bg-light p-1 shadow-sm sticky-top mt-5">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand fw-bold fs-3">
                    <span className="hotel-color text-uppercase">lakeSide Hotel</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link fw-semibold nav-hover" to={"/browse-all-rooms"}>
                                Browse All Rooms
                            </NavLink>
                        </li>

                        {
                            isLoggedIn && userRole === "ROLE_ADMIN" && (
                                <li className="nav-item">
                                    <NavLink className="nav-link fw-semibold nav-hover" to={"/admin"}>
                                        Admin
                                    </NavLink>
                                </li>
                            )
                        }
                    </ul>

                    <ul className="navbar-nav d-flex align-items-center">
                        <li className="nav-item">
                            <NavLink className="nav-link fw-semibold nav-hover" to={"/find-bookings"}>
                                Find My Bookings
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle fw-semibold nav-hover ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                Account
                            </a>

                            <ul
                                className={`dropdown-menu dropdown-menu-end shadow ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                {
                                    isLoggedIn ? (
                                        <li><Logout /></li>
                                    ) : (
                                        <li><Link to={"/login"} className="dropdown-item">Login</Link></li>
                                    )
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar