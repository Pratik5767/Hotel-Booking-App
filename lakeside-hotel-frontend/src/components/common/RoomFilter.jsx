import { useState } from "react"

const RoomFilter = ({ data, setFilteredData }) => {

    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredRooms);
    }

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]

    return (
        <div className="input-group mb-4 shadow-sm">
            <span className="input-group-text bg-primary text-white fw-semibold" id="room-type-filter">
                Filter Rooms
            </span>

            <select
                className="form-select"
                value={filter}
                onChange={handleSelectChange}
                aria-label="Filter rooms by type"
            >
                <option value={""}>Select a room type...</option>
                {
                    roomTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))
                }
            </select>

            <button className="btn btn-outline-danger fw-semibold" type="button" onClick={clearFilter}>
                Clear
            </button>
        </div>

    )
}

export default RoomFilter