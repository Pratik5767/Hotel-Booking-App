import { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });
    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { roomId } = useParams();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setRoom({ ...room, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
                setImagePreview(roomData.photo);
            } catch (error) {
                console.log(error);
            }
        }

        fetchRoom();
    }, [roomId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateRoom(roomId, room);
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully!");
                const updateRoomData = await getRoomById(roomId);
                setRoom(updateRoomData);
                setImagePreview(updateRoomData.photo);
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating room");
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("")
        }, 3000)
    }

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center fw-bold mb-4 mt-4">Edit Room</h3>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 p-4 shadow rounded bg-light">
                    {
                        successMessage && (
                            <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
                                {successMessage}
                            </div>
                        )
                    }

                    {
                        errorMessage && (
                            <div className="alert alert-danger alert-dismissible fade show shadow-sm" role="alert">
                                {errorMessage}
                            </div>
                        )
                    }

                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label fw-semibold text-primary">
                                Room Type
                            </label>

                            <input
                                type="text"
                                id="roomType"
                                name="roomType"
                                value={room.roomType}
                                onChange={handleInputChange}
                                className="form-control shadow-sm"
                                placeholder="Enter room type"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label fw-semibold text-primary">
                                Room Price
                            </label>

                            <input
                                type="number"
                                id="roomPrice"
                                name="roomPrice"
                                value={room.roomPrice}
                                onChange={handleInputChange}
                                className="form-control shadow-sm"
                                placeholder="Enter price"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label fw-semibold text-primary">
                                Room Photo
                            </label>

                            <input
                                required
                                type="file"
                                className="form-control shadow-sm"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                            />

                            {
                                imagePreview && (
                                    <div className="text-center mt-3">
                                        <img
                                            src={`data:image/jpeg;base64,${imagePreview}`}
                                            alt="room-preview"
                                            className="img-fluid rounded shadow"
                                            style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        />
                                    </div>
                                )
                            }
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <Link to={"/existing-rooms"} className="btn btn-outline-secondary shadow-sm">
                                Back
                            </Link>

                            <button type="submit" className="btn btn-warning shadow-sm">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoom