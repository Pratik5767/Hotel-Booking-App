import { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllRooms().then((data) => {
            setRooms(data);
            setLoading(false);
        }).catch((error) => {
            setErrorMsg(error.message);
            setLoading(false);
        })
    }, [])

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center my-4">
                <div className="spinner-border text-primary me-3" role="status" aria-hidden="true"></div>
                <strong className="mt-5">Loading rooms...</strong>
            </div>
        )
    }

    if (errorMsg) {
        return <div className="mt-5 text-danger mb-5">Error: {errorMsg}</div>
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow rounded-3 p-4">
            <div className="text-center mb-4">
                <Link
                    to={"/browse-all-rooms"}
                    className="hotel-color fw-bold text-uppercase fs-5 browse-link"
                    style={{ letterSpacing: "1px" }}
                >
                    Browse All Rooms
                </Link>

                <div
                    style={{
                        width: "60px",
                        height: "3px",
                        backgroundColor: "rgb(169, 77, 123)",
                        margin: "8px auto 0",
                        borderRadius: "2px",
                    }}
                ></div>
            </div>

            <Container>
                <Carousel indicators={false} interval={4000} pause="hover">
                    {
                        [...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                            <Carousel.Item key={index}>
                                <Row className="justify-content-center">
                                    {
                                        rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                            <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                                <Card className="h-100 shadow-sm border-0 room-card">
                                                    <Link to={`/book-room/${room.id}`}>
                                                        <Card.Img
                                                            variant="top"
                                                            src={`data:image/png;base64, ${room.photo}`}
                                                            alt="room-photo"
                                                            className="w-100 rounded-top"
                                                            style={{ height: "200px", objectFit: "cover" }}
                                                        />
                                                    </Link>

                                                    <Card.Body className="text-center">
                                                        <Card.Title className="hotel-color fw-bold">
                                                            {room.roomType}
                                                        </Card.Title>

                                                        <Card.Title className="room-price">
                                                            {room.roomPrice}/night
                                                        </Card.Title>

                                                        <div className="flex-shrink-0 mt-2">
                                                            <Link
                                                                to={`/book-room/${room.id}`}
                                                                className="btn btn-hotel btn-sm shadow-sm"
                                                            >
                                                                Book Now
                                                            </Link>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </Container>
        </section>
    )
}

export default RoomCarousel