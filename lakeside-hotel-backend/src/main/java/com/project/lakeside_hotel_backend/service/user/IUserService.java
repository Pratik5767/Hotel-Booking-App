package com.project.lakeside_hotel_backend.service.user;

import com.project.lakeside_hotel_backend.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUser(String email);
}