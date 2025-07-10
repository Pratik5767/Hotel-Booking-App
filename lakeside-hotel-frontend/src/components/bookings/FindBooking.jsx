import { useState } from "react"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions";

const FindBooking = () => {

    const [confirmationCode, setConfirmationCode] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
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
            setErrorMsg(null);
        } catch (error) {
            setBookingInfo(clearBookingInfo);
            if (error.response && error.response.status === 404) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg(error.response);
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
            setErrorMsg(null);
        } catch (error) {
            setErrorMsg(error.message);
        }

        setTimeout(() => {
            setSuccessMsg("");
            setIsDeleted(false);
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2>Find My Booking</h2>

                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confirmation code"
                        />

                        <button className="btn btn-hotel input-group-text">Find booking</button>
                    </div>
                </form>

                {
                    loading ? (
                        <div className="d-flex align-items-center justify-content-center my-4">
                            <div className="spinner-border text-primary me-3" role="status" aria-hidden="true"></div>
                            <strong>Finding booking....</strong>
                        </div>
                    ) : errorMsg ? (
                        <div className="text-danger">Error: {errorMsg}</div>
                    ) : bookingInfo.bookingConfirmationCode ? (
                        <div className="col-md-6 mt-4 mb-5">
                            <h3>Booking Information</h3>

                            <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                            <p>Booking Id: {bookingInfo.id}</p>
                            <p>Room Number: {bookingInfo.room.id}</p>
                            <p>Room Type: {bookingInfo.room.roomType}</p>
                            <p>Check-in Date: {bookingInfo.checkInDate}</p>
                            <p>Check-out Date: {bookingInfo.checkOutDate}</p>
                            <p>Full Name: {bookingInfo.guestFullName}</p>
                            <p>Email Address: {bookingInfo.guestEmail}</p>
                            <p>Adults: {bookingInfo.numOfAdults}</p>
                            <p>Children: {bookingInfo.numOfChildren}</p>
                            <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

                            {
                                !isDeleted && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleBookingCancelation(bookingInfo.id)}
                                    >
                                        Cancel Booking
                                    </button>
                                )
                            }
                        </div>
                    ) : (
                        <div>Find booking....</div>
                    )
                }

                {
                    isDeleted && (
                        <div className="alert alert-success mt-3" role="alert">{successMsg}</div>
                    )
                }
            </div>
        </>
    )
}

export default FindBooking