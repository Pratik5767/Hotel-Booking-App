import { useEffect, useState } from "react"
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import Header from "../common/Header"
import BookingsTable from "./BookingsTable";

const Bookings = () => {

    const [bookingInfo, setBookingInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getAllBookings().then((data) => {
                setBookingInfo(data);
                setLoading(false);
            }).catch((error) => {
                setErrorMsg(error.message);
                setLoading(false);
            })
        }, 1000)
    }, [])

    const handleBookingCancelation = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            const data = await getAllBookings();
            setBookingInfo(data);
        } catch (error) {
            setErrorMsg(error.message);
        }
    }

    return (
        <section className="container" style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Existing Bookings"} />

            {
                errorMsg && <div className="text-danger">{errorMsg}</div>
            }

            {
                loading ? (
                    <div>Loading existing booking....</div>
                ) : (
                    <div>
                        <BookingsTable
                            bookingInfo={bookingInfo}
                            handleBookingCancelation={handleBookingCancelation}
                        />
                    </div>
                )
            }
        </section>
    )
}

export default Bookings