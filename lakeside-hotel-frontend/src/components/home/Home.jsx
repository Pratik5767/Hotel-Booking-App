import HotelServices from "../common/HotelServices"
import Parallex from "../common/Parallex"
import RoomCarousel from "../common/RoomCarousel"
import RoomSearch from "../common/RoomSearch"
import MainHeader from "../layout/MainHeader"

const Home = () => {
    return (
        <section>
            <MainHeader />

            <section className="container">
                <RoomSearch/>
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