import { useState } from "react"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions";
import moment from "moment";

const FindBooking = () => {

    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        room: {
            id: "",
            roomType: ""
        },
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guetsEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    });
    const [isDeleted, setIsDeleted] = useState(false);
    const clearBookingInfo = {
        id: "",
        room: {
            id: "",
            roomType: ""
        },
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guetsEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await getBookingByConfirmationCode(confirmationCode);
            setBookingInfo(data);
            setError(null);
        } catch (error) {
            setBookingInfo(clearBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    const handleBookingCancelation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id);
            setIsDeleted(true);
            setSuccessMsg("Booking has been cancelled successfully!");
            setBookingInfo(clearBookingInfo);
            setConfirmationCode("");
            setError(null);
        } catch (error) {
            setError(error.message);
        }

        setTimeout(() => {
            setSuccessMsg("");
            setIsDeleted(false);
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="fw-bold text-primary mb-4">Find My Booking</h2>

                <form onSubmit={handleFormSubmit} className="col-md-6 shadow-sm p-3 rounded bg-light">
                    <div className="input-group">
                        <input
                            className="form-control"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter your booking confirmation code"
                        />

                        <button className="btn btn-primary input-group-text rounded-end">
                            <i className="bi bi-search me-1"></i> Find
                        </button>
                    </div>
                </form>

                {
                    loading && (
                        <div className="d-flex align-items-center justify-content-center my-4">
                            <div className="spinner-border text-primary me-3" role="status" aria-hidden="true" />

                            <strong>Finding booking...</strong>
                        </div>
                    )
                }

                {
                    error && (
                        <div className="alert alert-danger mt-4 col-md-6 text-center shadow-sm" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                        </div>
                    )
                }

                {
                    bookingInfo.bookingConfirmationCode && !loading && !error && (
                        <div className="card col-md-6 mt-4 mb-5 shadow-lg border-0">
                            <div className="card-body">
                                <h3 className="card-title text-center text-success">Booking Information</h3>
                                <hr />

                                <p className="text-success fw-bold">
                                    <i className="bi bi-check-circle-fill me-1"></i>
                                    Confirmation Code: {bookingInfo.bookingConfirmationCode}
                                </p>

                                <p><strong>Booking ID:</strong> {bookingInfo.id}</p>

                                <p><strong>Room Number:</strong> {bookingInfo.room.id}</p>

                                <p><strong>Room Type:</strong> {bookingInfo.room.roomType}</p>

                                <p><strong>Check-in Date:</strong> {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}</p>

                                <p><strong>Check-out Date:</strong> {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}</p>

                                <p><strong>Full Name:</strong> {bookingInfo.guestFullName}</p>

                                <p><strong>Email Address:</strong> {bookingInfo.guestEmail}</p>

                                <p><strong>Adults:</strong> {bookingInfo.numOfAdults}</p>

                                <p><strong>Children:</strong> {bookingInfo.numOfChildren}</p>

                                <p><strong>Total Guests:</strong> {bookingInfo.totalNumOfGuest}</p>

                                {
                                    !isDeleted && (
                                        <button
                                            className="btn btn-danger w-100 mt-3 shadow-sm"
                                            onClick={() => handleBookingCancelation(bookingInfo.id)}
                                        >
                                            <i className="bi bi-trash me-2"></i> Cancel Booking
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

                {
                    isDeleted && (
                        <div className="alert alert-success mt-3 col-md-6 text-center shadow-sm" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i> {successMsg}
                        </div>
                    )
                }

                {
                    !bookingInfo.bookingConfirmationCode && !loading && !error && (
                        <div className="text-muted mt-4">
                            Enter a confirmation code above to find your booking.
                        </div>
                    )
                }
            </div>
        </>

    )
}

export default FindBooking