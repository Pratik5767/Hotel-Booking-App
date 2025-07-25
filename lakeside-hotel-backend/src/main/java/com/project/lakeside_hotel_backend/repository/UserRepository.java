package com.project.lakeside_hotel_backend.repository;

import com.project.lakeside_hotel_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    void deleteByEmail(String email);

    Optional<User> findByEmail(String email);
}