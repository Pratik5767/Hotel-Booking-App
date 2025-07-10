import { useEffect, useState } from "react"
import { getRoomById } from "../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from "react-icons/fa";
import BookingForm from "../bookings/BookingForm"
import RoomCarousel from "../common/RoomCarousel";

const CheckOut = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });
    const { roomId } = useParams();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getRoomById(roomId).then((res) => {
                setRoomInfo(res);
                setLoading(false);
            }).catch((err) => {
                setError(err);
                setLoading(false);
            })
        }, 2000)
    }, [roomId])

    return (
        <div>
            <section className="container">
                <div className="row">
                    <div className="col-md-4 mt-5 mb-5">
                        {
                            loading ? (
                                <div className="d-flex align-items-center justify-content-center my-4">
                                    <div className="spinner-border text-primary me-3" role="status" aria-hidden="true"></div>
                                    <strong>Loading rooms information...</strong>
                                </div>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <div className="room-info">
                                    <img
                                        src={`data:image/png;base64,${roomInfo.photo}`}
                                        alt="room-photo"
                                        style={{ width: "100%", height: "200px" }}
                                    />

                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Room Type: </th>
                                                <th>{roomInfo.roomType}</th>
                                            </tr>

                                            <tr>
                                                <th>Room Price: </th>
                                                <th>{roomInfo.roomPrice}</th>
                                            </tr>

                                            <tr>
                                                <th>Room Service: </th>
                                                <td>
                                                    <ul className="list-unstyled">
                                                        <li><FaWifi /> Wifi</li>
                                                        <li><FaTv /> Netflix Premium</li>
                                                        <li><FaUtensils /> Breakfast</li>
                                                        <li><FaWineGlassAlt /> Mini bar refreshment</li>
                                                        <li><FaCar /> Car Service</li>
                                                        <li><FaParking /> Parking Space</li>
                                                        <li><FaTshirt /> Laundry</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>

                    <div className="col-md-8">
                        <BookingForm />
                    </div>
                </div>
            </section>

            <div className="container">
                <RoomCarousel />
            </div>

        </div>
    )
}

export default CheckOut