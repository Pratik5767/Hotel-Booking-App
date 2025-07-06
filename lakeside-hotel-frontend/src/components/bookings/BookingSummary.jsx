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
        <div className="card card-body mt-5">
            <h4 className="card-title">Reservation Summary</h4>

            <p>FullName: <strong>{booking.guestFullName}</strong></p>
            <p>Email: <strong>{booking.guestEmail}</strong></p>
            <p>checkInDate: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
            <p>checkOutDate: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
            <p>Number of days: <strong>{numberOfDays}</strong></p>

            <div>
                <h5>Number of Guests</h5>
                <strong>Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}</strong> <br />
                <strong>Children : {booking.numOfChildren}</strong>
            </div>

            {
                payment > 0 ? (
                    <>
                        <p>Total Payment: <strong>${payment}</strong></p>

                        {
                            isFormValid && !isBookingConfirmed ? (
                                <Button variant='success' onClick={handleConfirmedBooking}>
                                    {
                                        isProcessingPayment ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
                                                Booking confirmed, redirecting to payment....
                                            </>
                                        ) : ("Confirm Booking and proceed to payment")
                                    }
                                </Button>
                            ) : isBookingConfirmed ? (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : null
                        }
                    </>
                ) : (
                    <p className="text-danger">check-out date must be after check-in date</p>
                )
            }
        </div>
    )
}

export default BookingSummary