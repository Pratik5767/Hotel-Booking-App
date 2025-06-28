package com.project.lakeside_hotel_backend.service.bookedRoom;

import com.project.lakeside_hotel_backend.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

    List<BookedRoom> getAllBookings();

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    String saveBookings(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);
}
