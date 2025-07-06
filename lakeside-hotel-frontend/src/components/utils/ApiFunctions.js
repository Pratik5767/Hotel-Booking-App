import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9000"
})

// This functions adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();

    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData);
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

// This function gets all the room types from the database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

// This function gets all the rooms from the database
export async function getAllRooms() {
    try {
        const response = await api.get("/rooms/all-rooms");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

// This function deletes the room by id 
export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/delete/room/${roomId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`);
    }
}

// This function updates the room
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response;
}

// This function gets the room by the id
export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/room/${roomId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

// This function saves the new booking
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error booking room: ${error.message}`);
        }
    }
}

// This function gets all the bookings
export async function getAllBookings() {
    try {
        const response = await api.get(`/bookings/all-bookings`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

// This function gets the booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const response = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error booking room ${error.message}`);
        }
    }
}

// This function cancel the booking
export async function cancelBooking(bookingId) {
    try {
        const response = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return response.data;
    } catch (error) {
        throw new Error(`Error canceling booking: ${error.message}`);
    }
}