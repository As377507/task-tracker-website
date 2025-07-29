package com.akashsen.todo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.akashsen.todo.entity.Todo;
import com.akashsen.todo.entity.User;

import jakarta.transaction.Transactional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUser(User user);

    Optional<Todo> findByIdAndUser(Long id, User user);

    
    @Modifying
    @Transactional
    @Query("UPDATE Todo t SET t.completed = true WHERE t.status = 'COMPLETED'")
    void updateCompletedStatusForCompletedTasks();
}
