import moment from "moment";
import { useState } from "react"
import { getAvailableRooms } from "../utils/ApiFunctions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RoomTypeSelector from "../common/RoomTypeSelector"
import RoomSearchResult from "./RoomSearchResult";

const RoomSearch = () => {

    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const checkIn = moment(searchQuery.checkInDate);
        const checkOut = moment(searchQuery.checkOutDate);

        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMsg("Please, enter valid date range");
            return;
        }

        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMsg("Check-In date must come before check-Out date");
            return;
        }

        setLoading(true);
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType).then((res) => {
            setAvailableRooms(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }).catch((error) => {
            setErrorMsg(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery({ ...searchQuery, [name]: value });
        const checkIn = moment(searchQuery.checkInDate);
        const checkOut = moment(searchQuery.checkOutDate);

        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMsg("");
        }
    }

    const clearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: "",
        });
        setAvailableRooms([]);
    }

    return (
        <>
            <Container className="mt-5 mb-5 py-5 shadow">
                <Form onSubmit={handleSearch}>
                    <Row className="justify-content-center">
                        <Col xs={12} md={3}>
                            <Form.Group controlId="checkInDate">
                                <Form.Label>Check-In Date</Form.Label>

                                <Form.Control
                                    type="date"
                                    name="checkInDate"
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId="checkOutDate">
                                <Form.Label>Check-Out Date</Form.Label>

                                <Form.Control
                                    type="date"
                                    name="checkOutDate"
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label>Room Type</Form.Label>

                                <div className="d-flex">
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery}
                                    />

                                    <Button variant="secondary" type="submit">Search</Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {
                    loading ? (
                        <div className="d-flex align-items-center justify-content-center my-4">
                            <div className="spinner-border text-primary me-3" role="status" aria-hidden="true"></div>
                            <strong>finding available rooms....</strong>
                        </div>
                    ) : availableRooms ? (
                        <RoomSearchResult
                            results={availableRooms}
                            onClearSearch={clearSearch}
                        />
                    ) : (
                        <p>No rooms available for the selected dates and room type</p>
                    )
                }

                {
                    errorMsg && <p className="text-danger">{errorMsg}</p>
                }
            </Container>
        </>
    )
}

export default RoomSearch