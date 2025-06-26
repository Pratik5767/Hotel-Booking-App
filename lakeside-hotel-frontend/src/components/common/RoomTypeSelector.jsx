import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {

    const [roomTypes, setRoomTypes] = useState([""]);
    const [newRoomType, setNewRoomType] = useState("");
    const [showNewRoomTypesInput, setShowNewRoomTypesInput] = useState(false);

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        });
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = (e) => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypesInput(false);
        }
    }

    return (
        <>
            {
                roomTypes.length > 0 && (
                    <div>
                        <select
                            required
                            id="roomType"
                            name="roomType"
                            value={newRoom.roomType}
                            onChange={(e) => {
                                if (e.target.value === "Add New") {
                                    setShowNewRoomTypesInput(true);
                                } else {
                                    handleRoomInputChange(e);
                                }
                            }}
                            className="form-select"
                        >
                            <option value={""}>select a room type</option>
                            <option value={"Add New"}>Add New</option>
                            {
                                roomTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))
                            }
                        </select>

                        {
                            showNewRoomTypesInput && (
                                <div className="input-group mt-2">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter a new room type"
                                        onChange={handleNewRoomTypeInputChange}
                                    />

                                    <button className="btn btn-hotel" onClick={handleAddNewRoomType}>
                                        Add
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default RoomTypeSelector