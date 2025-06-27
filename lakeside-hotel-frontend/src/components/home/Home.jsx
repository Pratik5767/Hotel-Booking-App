import HotelServices from "../common/HotelServices"
import Parallex from "../common/Parallex"
import RoomCarousel from "../common/RoomCarousel"
import MainHeader from "../layout/MainHeader"

const Home = () => {
    return (
        <section>
            <MainHeader />

            <section className="container">
                <RoomCarousel />
                <Parallex />
                <RoomCarousel />
                <HotelServices />
                <Parallex />
                <RoomCarousel />
            </section>
        </section>
    )
}

export default Home