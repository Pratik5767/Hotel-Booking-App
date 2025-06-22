package com.project.lakeside_hotel_backend.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Room {
    private long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;
    private List<BookedRoom> bookings;

    public Room() {
        this.bookings = new ArrayList<>();
    }
}
