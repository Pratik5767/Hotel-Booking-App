package com.project.lakeside_hotel_backend.service.bookedRoom;

import com.project.lakeside_hotel_backend.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

}
