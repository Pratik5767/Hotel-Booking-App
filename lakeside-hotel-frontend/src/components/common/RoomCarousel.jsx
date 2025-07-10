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
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-rooms"} className="hotel-color text-center">
                Browse all rooms
            </Link>

            <Container>
                <Carousel indicators={false}>
                    {
                        [...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                            <Carousel.Item key={index}>
                                <Row>
                                    {
                                        rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                            <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                                <Card>
                                                    <Link to={`/book-room/${room.id}`}>
                                                        <Card.Img
                                                            variant="top"
                                                            src={`data:image/png;base64, ${room.photo}`}
                                                            alt="room-photo"
                                                            className="w-100"
                                                            style={{ height: "200px" }}
                                                        />
                                                    </Link>

                                                    <Card.Body>
                                                        <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                                                        <Card.Title className="room-price">{room.roomPrice}/night</Card.Title>

                                                        <div className="flex-shrink-0">
                                                            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
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