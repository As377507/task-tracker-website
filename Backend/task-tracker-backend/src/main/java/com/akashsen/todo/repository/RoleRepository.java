package com.akashsen.todo.repository;

import com.akashsen.todo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);          // for finding role

    boolean existsByName(String name);               // for checking existence
}
