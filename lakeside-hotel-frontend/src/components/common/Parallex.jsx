import { Container } from "react-bootstrap"

const Parallex = () => {
    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center">
                <div className="animated-texts bounceIn">
                    <h1 className="display-4 fw-bold text-uppercase text-white mb-3">
                        Welcome to{" "}
                        <span className="hotel-color">
                            LakeSide Hotel
                        </span>
                    </h1>

                    <h3 className="lead fw-semibold text-light">
                        We Offer the Best Services for All Your Needs
                    </h3>

                </div>
            </Container>
        </div>
    )
}

export default Parallex