package com.project.lakeside_hotel_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Collection<User> users = new HashSet<>();

    public Role(String name) {
        this.name = name;
    }

    public void assignRoleToUser(User user) {
        user.getRoles().add(this);
        this.getUsers().add(user);
    }

    public void removeUserFormRoom(User user) {
        user.getRoles().remove(this);
        this.getUsers().remove(user);
    }

    public void removeAllUsersFromRoom() {
        if (this.getUsers() != null) {
            List<User> roleUsers = this.getUsers().stream().toList();
            roleUsers.forEach((this :: removeUserFormRoom));
        }
    }

    public String getName() {
        return name != null ? name: "";
    }
}
