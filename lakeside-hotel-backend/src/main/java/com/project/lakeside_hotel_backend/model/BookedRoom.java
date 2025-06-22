package com.project.lakeside_hotel_backend.model;

import java.time.LocalDate;

public class BookedRoom {

    private Long bookingId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestFullName;
    private String guestEmail;
    private int numOfChildren;
    private int numOfAdults;
    private int totalNumOfGuest;
    private String bookingConfirmationCode;
    private Room room;

    public void calculateTotalNumberOfGuests() {
        this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculateTotalNumberOfGuests();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumberOfGuests();
    }

//    public void setBookingConfirmationCode(String bookingConfirmationCode) {
//        this.bookingConfirmationCode = bookingConfirmationCode;
//    }
}