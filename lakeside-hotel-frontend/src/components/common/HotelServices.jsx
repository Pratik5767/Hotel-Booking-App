import { Card, Col, Container, Row } from "react-bootstrap"
import Header from "./Header"
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa"

const HotelServices = () => {
    return (
        <>
            <Container className="mb-2">
                <Header title={"Our Services"} />

                <Row className="mt-3 text-center">
                    <h4 className="flex flex-col gap-2 fw-bold">
                        Services at <span className="hotel-color">LakeSide Hotel</span>

                        <span className="gap-2 text-muted fs-4">
                            <FaClock className="ms-2" /> 24-Hour Front Desk
                        </span>
                    </h4>
                </Row>

                <hr className="w-50 mx-auto mb-4" style={{ border: "1px solid #a94d7b" }} />

                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    {
                        [
                            {
                                icon: <FaWifi />,
                                title: "WiFi", text: "Stay connected with high speed internet access."
                            },
                            {
                                icon: <FaUtensils />,
                                title: "Breakfast", text: "Start your day with a delicious breakfast buffet."
                            },
                            {
                                icon: <FaTshirt />,
                                title: "Laundry", text: "Keep your clothes clean and fresh with our laundry service."
                            },
                            {

                                icon: <FaCocktail />,
                                title: "Mini-bar", text: "Enjoy a refreshing drink or snack from our in-room mini-bar."
                            },
                            {
                                icon: <FaParking />,
                                title: "Parking", text: "Park your car conveniently in our on-site parking lot."
                            },
                            {
                                icon: <FaSnowflake />,
                                title: "Air Conditioning", text: "Stay cool and comfortable with our air conditioning system."
                            }
                        ].map((service, idx) => (
                            <Col key={idx}>
                                <Card className="h-100 border-1 shadow-sm service-card">
                                    <Card.Body className="text-center">
                                        <Card.Title className="hotel-color fs-4 mb-2 d-flex align-items-center justify-content-center gap-2">
                                            {service.icon} {service.title}
                                        </Card.Title>

                                        <Card.Text className="text-muted">{service.text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
            <hr />
        </>
    )
}

export default HotelServices