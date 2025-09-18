import { Button } from "react-bootstrap";
import moment from "moment"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {

    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numberOfDays = checkOutDate.diff(checkInDate, "days");
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmedBooking = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000)
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])

    return (
        <div className="card shadow-lg rounded-4 p-4 border-0">
            <h3 className="card-title text-center text-success fw-bold text-primary mb-4">
                Booking Summary
            </h3>

            <div className="mb-4 mt-3">
                <p className="mb-1">
                    <strong className="text-secondary">Full Name:</strong> {booking.guestFullName}
                </p>

                <p className="mb-1">
                    <strong className="text-secondary">Email:</strong> {booking.guestEmail}
                </p>

                <p className="mb-1">
                    <strong className="text-secondary">Check-In:</strong> {moment(booking.checkInDate).format("MMM Do YYYY")}
                </p>

                <p className="mb-1">
                    <strong className="text-secondary">Check-Out:</strong> {moment(booking.checkOutDate).format("MMM Do YYYY")}
                </p>

                <p className="mb-1">
                    <strong className="text-secondary">Number of Days:</strong> {numberOfDays}
                </p>
            </div>

            <div className="bg-light rounded-3 p-3 mb-3">
                <h5 className="fw-semibold text-dark mb-2">Number of Guests</h5>

                <p className="mb-1">
                    <strong>Adult{booking.numOfAdults > 1 ? "s" : ""}:</strong> {booking.numOfAdults}
                </p>

                <p className="mb-1">
                    <strong>Children:</strong> {booking.numOfChildren}
                </p>
            </div>

            {
                payment > 0 ? (
                    <>
                        <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm rounded-3 mb-3">
                            <span className="fw-semibold fs-5 text-dark">Total Payment:</span>
                            <span className="fw-bold fs-5 text-success">${payment}</span>
                        </div>

                        {
                            isFormValid && !isBookingConfirmed ? (
                                <Button variant="success" onClick={handleConfirmedBooking} className="w-100 py-2 rounded-pill fw-semibold shadow-sm mt-4">
                                    {
                                        isProcessingPayment ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                                Booking confirmed, redirecting to payment...
                                            </>
                                        ) : (
                                            "Confirm Booking & Proceed to Payment"
                                        )
                                    }
                                </Button>
                            ) : isBookingConfirmed ? (
                                <div className="d-flex justify-content-center align-items-center mt-3">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : null
                        }
                    </>
                ) : (
                    <p className="text-danger text-center mt-3">
                        Check-out date must be after check-in date.
                    </p>
                )
            }
        </div>
    )
}

export default BookingSummary