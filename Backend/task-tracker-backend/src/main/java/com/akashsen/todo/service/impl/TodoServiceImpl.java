package com.akashsen.todo.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.akashsen.todo.dto.TodoDto;
import com.akashsen.todo.entity.Todo;
import com.akashsen.todo.entity.User;
import com.akashsen.todo.repository.TodoRepository;
import com.akashsen.todo.repository.UserRepository;
import com.akashsen.todo.service.TodoService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<TodoDto> getTodos(String email) {
        User user = getUser(email);
        return user.getTodos()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TodoDto getTodoById(Long id, String email) {
        Todo todo = findTodoByIdAndUserEmail(id, email);
        return mapToDto(todo);
    }

    public TodoDto createTodo(TodoDto todoDto, String email) {
        User user = getUser(email);
        Todo todo = new Todo();
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setStatus("Not Started");
        todo.setPriority(todoDto.getPriority());
        todo.setEstimatedTime(todoDto.getEstimatedTime());
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        todo.setUser(user);
        Todo saved = todoRepository.save(todo);
        return mapToDto(saved);
    }

    public TodoDto updateTodo(Long id, TodoDto todoDTO, String email) {
        Todo todo = findTodoByIdAndUserEmail(id, email);

        // Update title and description if provided
        if (todoDTO.getTitle() != null) {
            todo.setTitle(todoDTO.getTitle());
        }

        if (todoDTO.getDescription() != null) {
            todo.setDescription(todoDTO.getDescription());
        }

        // Update status if changed
        if (todoDTO.getStatus() != null) {
            String newStatus = todoDTO.getStatus();
            todo.setStatus(newStatus);

            // ✅ Set startTime when status is changed to "In Progress"
            if ("In Progress".equalsIgnoreCase(newStatus) && todo.getStartTime() == null) {
                todo.setStartTime(LocalDateTime.now());
            }

            // ✅ Set endTime and completed=true when status is "Completed"
            if ("Completed".equalsIgnoreCase(newStatus) && todo.getEndTime() == null) {
                todo.setEndTime(LocalDateTime.now());
                todo.setCompleted(true);
                System.out.println("✅ Completed = true and endTime set for todo id: " + todo.getId());
            }
        }

        // Always update the updatedAt field
        todo.setUpdatedAt(LocalDateTime.now());

        // ✅ Save and return updated entity
        Todo updatedTodo = todoRepository.save(todo);
        return mapToDto(updatedTodo);
    }

    public void deleteTodo(Long id, String email) {
        Todo todo = findTodoByIdAndUserEmail(id, email);
        todoRepository.delete(todo);
    }

    public TodoDto startTodo(Long id, String email, LocalDateTime time) {
        Todo todo = findTodoByIdAndUserEmail(id, email);
        if (todo.getStartTime() == null) {
            todo.setStartTime(LocalDateTime.now());
        }
        todo.setStatus("In Progress");
        todo.setUpdatedAt(LocalDateTime.now());
        return mapToDto(todoRepository.save(todo));
    }

    public TodoDto finishTodo(Long id, String email, LocalDateTime time) {
        Todo todo = findTodoByIdAndUserEmail(id, email);
        if (todo.getEndTime() == null) {
            todo.setEndTime(LocalDateTime.now());
        }
        todo.setStatus("Completed");
        todo.setUpdatedAt(LocalDateTime.now());
        return mapToDto(todoRepository.save(todo));
    }

    @Override
    @Transactional
    public void markTodosAsCompleted() {
        todoRepository.updateCompletedStatusForCompletedTasks();
    }

    private Todo findTodoByIdAndUserEmail(Long id, String email) {
        Optional<Todo> todoOpt = todoRepository.findById(id);
        if (todoOpt.isEmpty()) {
            throw new RuntimeException("Todo not found");
        }
        Todo todo = todoOpt.get();
        if (!todo.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access denied");
        }
        return todo;
    }

    private TodoDto mapToDto(Todo todo) {
        TodoDto dto = new TodoDto();
        dto.setId(todo.getId());
        dto.setTitle(todo.getTitle());
        dto.setDescription(todo.getDescription());
        dto.setStatus(todo.getStatus());
        dto.setCreatedAt(todo.getCreatedAt());
        dto.setUpdatedAt(todo.getUpdatedAt());
        dto.setStartTime(todo.getStartTime());
        dto.setEndTime(todo.getEndTime());
        dto.setPriority(todo.getPriority());
        dto.setEstimatedTime(todo.getEstimatedTime());
        return dto;
    }
}
