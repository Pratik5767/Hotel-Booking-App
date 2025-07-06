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
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    });
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
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
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card-title">Reserve Room</h4>

                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label className="hotel-color" htmlFor="guestFullName">Full Name: </Form.Label>

                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your fullName"
                                        onChange={handleInputChange}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please enter your fullname
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mt-2">
                                    <Form.Label className="hotel-color" htmlFor="guestEmail">Email: </Form.Label>

                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email address
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px" }}>
                                    <legend>Logging period</legend>

                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label className="hotel-color" htmlFor="checkInDate">Check-In date: </Form.Label>

                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="check-in date"
                                                onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-in date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label className="hotel-color" htmlFor="checkOutDate">Check-Out date: </Form.Label>

                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="check-out date"
                                                onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-out date
                                            </Form.Control.Feedback>
                                        </div>

                                        {
                                            errorMsg && <p className="error-message text-danger">{errorMsg}</p>
                                        }
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number of Guest</legend>

                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label className="hotel-color" htmlFor="numOfAdults">Adults: </Form.Label>

                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                min={1}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select atleast one adult.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label className="hotel-color" htmlFor="numOfChildren">Children: </Form.Label>

                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren"
                                                value={booking.numOfChildren}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select 0 if no children.
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">Continue</button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-6">
                        {
                            isSubmited && (
                                <BookingSummary
                                    booking={booking}
                                    payment={calculatePayment()}
                                    isFormValid={isValidated}
                                    onConfirm={handleFromSubmit}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingForm