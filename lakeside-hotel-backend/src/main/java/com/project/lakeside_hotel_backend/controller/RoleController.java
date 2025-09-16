package com.project.lakeside_hotel_backend.controller;

import com.project.lakeside_hotel_backend.exception.RoleAlreadyExistsException;
import com.project.lakeside_hotel_backend.model.Role;
import com.project.lakeside_hotel_backend.model.User;
import com.project.lakeside_hotel_backend.service.role.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final IRoleService roleService;

    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getRoles(), FOUND);
    }

    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role theRole) {
        try {
            roleService.createRole(theRole);
            return ResponseEntity.ok("New role created successfully!");
        } catch (RoleAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId) {
        roleService.deleteRole(roleId);
    }

    @PostMapping("/remove-all-users-from-role/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId) {
        return roleService.removeAllUsersFromRole(roleId);
    }

    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(@RequestParam Long userId, @RequestParam Long roleId) {
        return roleService.removeUserFromRole(userId, roleId);
    }

    @PostMapping("/assign-role-to-user")
    public User assignRoleToUser(@RequestParam Long userId, @RequestParam Long roleId) {
        return roleService.assignRoleToUser(userId, roleId);
    }
}
