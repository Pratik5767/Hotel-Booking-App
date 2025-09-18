import { useEffect, useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [loading, setLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMag, setErrorMsg] = useState("");

    useEffect(() => {
        fetchRooms();
    }, [])

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const response = await getAllRooms();
            setRooms(response);
            setLoading(false);
        } catch (error) {
            setErrorMsg(error.message);
        }
    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType])

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDelete = async (roomId) => {
        try {
            const response = await deleteRoom(roomId);
            if (response === "") {
                setSuccessMsg(`Room no ${roomId} was deleted`);
                fetchRooms();
            } else {
                console.error(`Error deleting room: ${response.message}`);
            }
        } catch (error) {
            setErrorMsg(error.message);
        }
        setTimeout(() => {
            setSuccessMsg("");
            setErrorMsg("");
        }, 3000)
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {
                    successMsg && (
                        <div className="alert alert-success mt-4 shadow-sm rounded text-center">
                            {successMsg}
                        </div>
                    )
                }

                {
                    errorMag && (
                        <div className="alert alert-danger mt-4 shadow-sm rounded text-center">
                            {errorMag}
                        </div>
                    )
                }
            </div>

            {
                loading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center my-5">
                        <div className="spinner-border text-primary mb-3" role="status" aria-hidden="true"></div>

                        <strong className="text-muted">Loading existing rooms...</strong>
                    </div>
                ) : (
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold mb-3 mb-md-0">Existing Rooms</h2>

                            <Link to={"/add-room"} className="btn btn-primary shadow-sm">
                                <FaPlus className="me-2" /> Add Room
                            </Link>
                        </div>

                        <Row className="mb-4">
                            <Col md={6} className="mb-3 mb-md-0">
                                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                            </Col>
                        </Row>

                        <div className="table-responsive shadow-sm rounded">
                            <table className="table table-hover table-bordered align-middle text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Room Type</th>
                                        <th>Room Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        currentRooms.length > 0 ? (
                                            currentRooms.map((room) => (
                                                <tr key={room.id}>
                                                    <td className="fw-semibold">{room.id}</td>
                                                    <td>{room.roomType}</td>
                                                    <td>${room.roomPrice}</td>
                                                    <td className="d-flex justify-content-center gap-2">
                                                        <Link to={`/edit-room/${room.id}`} className="btn btn-info btn-sm">
                                                            <FaEye />
                                                        </Link>

                                                        <Link to={`/edit-room/${room.id}`} className="btn btn-warning btn-sm">
                                                            <FaEdit />
                                                        </Link>

                                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(room.id)}>
                                                            <FaTrashAlt />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-muted py-4">
                                                    No rooms found.
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                                onPageChange={handlePaginationClick}
                            />
                        </div>
                    </section>
                )
            }
        </>

    )
}

export default ExistingRooms