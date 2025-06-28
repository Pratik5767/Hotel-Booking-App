package com.project.lakeside_hotel_backend.repository;

import com.project.lakeside_hotel_backend.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom, Long> {

}
