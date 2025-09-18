import { useState } from "react"
import { addRoom } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });
    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewRoom({ ...newRoom, [name]: value });
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if (success !== undefined) {
                setSuccessMessage("A new room was added successfully!");
                setNewRoom({ photo: null, roomType: "", roomPrice: "" });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding room");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("")
        }, 3000)
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 p-4 shadow rounded bg-light">
                        <h2 className="text-center fw-bold mb-4">Add New Room</h2>

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

                                <div className="shadow-sm p-2 rounded border">
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleRoomInputChange}
                                        newRoom={newRoom}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label fw-semibold text-primary">
                                    Room Price
                                </label>

                                <input
                                    type="number"
                                    id="roomPrice"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                    className="form-control shadow-sm"
                                    placeholder="Enter room price"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label fw-semibold text-primary">
                                    Room Photo
                                </label>

                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    onChange={handleImageChange}
                                    className="form-control shadow-sm"
                                />

                                {
                                    imagePreview && (
                                        <div className="text-center mt-3">
                                            <img
                                                src={imagePreview}
                                                alt="preview-room-photo"
                                                className="img-fluid rounded shadow"
                                                style={{ maxWidth: "400px", maxHeight: "400px" }}
                                            />
                                        </div>
                                    )
                                }
                            </div>

                            <div className="d-flex justify-content-between mt-4">
                                <Link to={"/existing-rooms"} className="btn btn-outline-secondary shadow-sm">
                                    Existing Rooms
                                </Link>

                                <button className="btn btn-primary shadow-sm">
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AddRoom