import { parseISO } from "date-fns";
import { useEffect, useState } from "react"
import DateSlider from "../common/DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancelation }) => {

    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo;

        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate);
                const bookingEndDate = parseISO(booking.checkOutDate);
                return bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate;
            });
        }

        setFilteredBookings(filtered);
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo])

    return (
        <section className="p-4">
            <DateSlider
                onDateChange={filterBookings}
                onFilterChange={filterBookings}
            />

            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking Id</th>
                        <th>Room Id</th>
                        <th>Room Type</th>
                        <th>Check-In date</th>
                        <th>Check-Out date</th>
                        <th>Guest name</th>
                        <th>Guest email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total guests</th>
                        <th>Confirmation code</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {
                        filteredBookings.map((booking, index) => (
                            <tr key={booking.id}>
                                <td>{index + 1}</td>
                                <td>{booking.id}</td>
                                <td>{booking.room.id}</td>
                                <td>{booking.room.roomType}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.guestFullName}</td>
                                <td>{booking.guestEmail}</td>
                                <td>{booking.numOfAdults}</td>
                                <td>{booking.numOfChildren}</td>
                                <td>{booking.totalNumOfGuest}</td>
                                <td>{booking.bookingConfirmationCode}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleBookingCancelation(booking.id)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                filterBookings.length === 0 && <p>No booking found for the selected dates</p>
            }
        </section>
    )
}

export default BookingsTable