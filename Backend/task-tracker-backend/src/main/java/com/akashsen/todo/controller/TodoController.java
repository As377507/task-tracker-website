package com.akashsen.todo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akashsen.todo.dto.TodoDto;
import com.akashsen.todo.service.TodoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TodoController {

    private final TodoService todoService;

    // ✅ Get all todos for authenticated user
    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(todoService.getTodos(email));
    }

    // ✅ Create new todo
    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody TodoDto todoDto, Authentication authentication) {
        try {
            String email = authentication.getName();
            return ResponseEntity.ok(todoService.createTodo(todoDto, email));
        } catch (Exception e) {
            e.printStackTrace(); // this will show the real cause in console
            return ResponseEntity.badRequest().body("Failed to add todo: " + e.getMessage());
        }
    }

    // ✅ Update existing todo
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(
            @PathVariable Long id,
            @RequestBody TodoDto todoDto,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(todoService.updateTodo(id, todoDto, email));
    }

    // ✅ Delete todo by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        todoService.deleteTodo(id, email);
        return ResponseEntity.noContent().build();
    }

    // ✅ Get specific todo by ID
    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(todoService.getTodoById(id, email));
    }

    // ✅ Start a Todo (sets status to "IN_PROGRESS" and sets start_time)
    @PutMapping("/{id}/start")
    public ResponseEntity<TodoDto> startTodo(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(todoService.startTodo(id, email, null));
    }

    // ✅ Finish a Todo (sets status to "COMPLETED", sets end_time and updates updated_at)
    @PutMapping("/{id}/finish")
    public ResponseEntity<TodoDto> finishTodo(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(todoService.finishTodo(id, email, null));
    }

    @PostMapping("/mark-completed")
    public ResponseEntity<String> markCompletedStatusForCompletedTasks() {
        todoService.markTodosAsCompleted();
        return ResponseEntity.ok("Marked completed=true where status='Completed'");
    }

}
