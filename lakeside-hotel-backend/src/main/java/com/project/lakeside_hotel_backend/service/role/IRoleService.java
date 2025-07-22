package com.project.lakeside_hotel_backend.service.role;

import com.project.lakeside_hotel_backend.model.Role;
import com.project.lakeside_hotel_backend.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();

    Role createRole(Role theRole);

    void deleteRole(Long id);

    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);

    User assignRoleToUser(Long userId, Long roleId);

    Role removeAllUsersFromRole(Long roleId);
}