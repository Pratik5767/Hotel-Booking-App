import { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BookingSummary from "./BookingSummary";
import { Form, FormControl } from "react-bootstrap";

const BookingForm = () => {

    const [isValidated, setIsValidated] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);

    const currentUser = localStorage.getItem("userId");
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    });
    const { roomId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMsg("");
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    }

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        const price = roomPrice ? roomPrice : 0;
        return diffInDays * price;
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMsg("check-out date must come after check-in date");
            return false;
        } else {
            setErrorMsg("");
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmited(true);
        }
        setIsValidated(true);
    }

    const handleFromSubmit = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmited(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            setErrorMsg(error.message);
            navigate("/booking-success", { state: { error: errorMsg } });
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId])

    return (
        <>
            <div className="container my-5">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card shadow-lg rounded-4 p-4 border-0">
                            <h3 className="card-title text-center mb-4 text-primary fw-bold">
                                Reserve Your Room
                            </h3>

                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold hotel-color" htmlFor="guestFullName">
                                        Full Name
                                    </Form.Label>

                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your full name"
                                        onChange={handleInputChange}
                                        className="rounded-pill shadow-sm"
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold hotel-color" htmlFor="guestEmail">
                                        Email
                                    </Form.Label>

                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email address"
                                        onChange={handleInputChange}
                                        className="rounded-pill shadow-sm"
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email address
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset className="border p-3 rounded-3 mb-3">
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <Form.Label className="fw-semibold hotel-color" htmlFor="checkInDate">
                                                Check-In Date
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                onChange={handleInputChange}
                                                className="rounded shadow-sm"
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-in date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label className="fw-semibold hotel-color" htmlFor="checkOutDate">
                                                Check-Out Date
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                onChange={handleInputChange}
                                                className="rounded shadow-sm"
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-out date
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>

                                    {
                                        errorMsg && <p className="text-danger mt-2">{errorMsg}</p>
                                    }
                                </fieldset>

                                <fieldset className="border p-3 rounded-3 mb-3">
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <Form.Label className="fw-semibold hotel-color" htmlFor="numOfAdults">
                                                Adults
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                min={1}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                                className="rounded shadow-sm"
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select at least one adult.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label className="fw-semibold hotel-color" htmlFor="numOfChildren">
                                                Children
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren"
                                                value={booking.numOfChildren}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                                className="rounded shadow-sm"
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select 0 if no children.
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="text-center mt-4">
                                    <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill shadow-sm fw-semibold">
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-6">
                        {
                            isSubmited && (
                                <div>
                                    <BookingSummary
                                        booking={booking}
                                        payment={calculatePayment()}
                                        isFormValid={isValidated}
                                        onConfirm={handleFromSubmit}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default BookingForm