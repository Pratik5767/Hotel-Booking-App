import { useLocation } from "react-router-dom"
import Header from "../common/Header";

const BookingSuccess = () => {

    const location = useLocation();
    const message = location.state?.message;
    const error = location.state?.error;

    return (
        <div className="container my-5">
            <Header title="Booking Success" />

            <div className="d-flex justify-content-center mt-5">
                <div className="card shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: "500px", width: "100%" }}>
                    {
                        message ? (
                            <>
                                <div className="mb-3">
                                    <span className="display-6 text-success">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                </div>

                                <h3 className="fw-bold text-success">Booking Successful!</h3>

                                <p className="text-muted mt-2">{message}</p>

                                <a href="/" className="btn btn-outline-success mt-3 rounded-pill px-4">
                                    Go to Home
                                </a>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <span className="display-6 text-danger">
                                        <i className="bi bi-x-circle-fill"></i>
                                    </span>
                                </div>

                                <h3 className="fw-bold text-danger">Booking Failed</h3>

                                <p className="text-muted mt-2">{error}</p>

                                <a href="/" className="btn btn-outline-danger mt-3 rounded-pill px-4">
                                    Try Again
                                </a>
                            </>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default BookingSuccess