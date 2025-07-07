import { Container } from "react-bootstrap"

const Parallex = () => {
    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center">
                <div className="animated-texts bounceIn mt-5">
                    <h1>
                        Welcome to <span className="hotel-color">lakeSide Hotel</span>
                    </h1>

                    <h3>We Offer the best services for all your needs</h3>
                </div>
            </Container>
        </div>
    )
}

export default Parallex