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
            <section className="container my-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        {
                            loading ? (
                                <div className="d-flex flex-column align-items-center justify-content-center my-5">
                                    <div
                                        className="spinner-border text-primary mb-3"
                                        role="status"
                                        aria-hidden="true"
                                        style={{ width: "3rem", height: "3rem" }}
                                    ></div>

                                    <strong>Loading rooms information...</strong>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger text-center shadow-sm rounded">
                                    {error}
                                </div>
                            ) : (
                                <div className="room-info card shadow-lg rounded-3 overflow-hidden">
                                    <img
                                        src={`data:image/png;base64,${roomInfo.photo}`}
                                        alt="room-photo"
                                        className="card-img-top"
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />

                                    <div className="card-body">
                                        <table className="table table-bordered table-striped align-middle mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="w-50">Room Type:</th>
                                                    <td className="fw-semibold">{roomInfo.roomType}</td>
                                                </tr>

                                                <tr>
                                                    <th>Room Price:</th>
                                                    <td className="fw-semibold text-success">
                                                        ₹{roomInfo.roomPrice}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Room Services:</th>
                                                    <td>
                                                        <ul className="list-unstyled mb-0">
                                                            <li className="mb-1">
                                                                <FaWifi className="me-2 text-primary" /> Wifi
                                                            </li>

                                                            <li className="mb-1">
                                                                <FaTv className="me-2 text-danger" /> Netflix Premium
                                                            </li>

                                                            <li className="mb-1">
                                                                <FaUtensils className="me-2 text-warning" /> Breakfast
                                                            </li>

                                                            <li className="mb-1">
                                                                <FaWineGlassAlt className="me-2 text-pink" /> Mini Bar Refreshment
                                                            </li>

                                                            <li className="mb-1">
                                                                <FaCar className="me-2 text-secondary" /> Car Service
                                                            </li>

                                                            <li className="mb-1">
                                                                <FaParking className="me-2 text-dark" /> Parking Space
                                                            </li>

                                                            <li>
                                                                <FaTshirt className="me-2 text-info" /> Laundry
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="col-md-8">
                        <div className="card shadow-lg rounded-3 px-4">
                            <BookingForm />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container my-5">
                <div className="card shadow-lg rounded-3 p-3">
                    <RoomCarousel />
                </div>
            </div>
        </div>

    )
}

export default CheckOut