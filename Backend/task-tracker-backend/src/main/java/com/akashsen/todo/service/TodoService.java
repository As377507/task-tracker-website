package com.akashsen.todo.service;

import java.time.LocalDateTime;
import java.util.List;

import com.akashsen.todo.dto.TodoDto;

public interface TodoService {

    List<TodoDto> getTodos(String email);

    TodoDto createTodo(TodoDto dto, String email);

    TodoDto updateTodo(Long id, TodoDto dto, String email);

    void deleteTodo(Long id, String email);

    TodoDto getTodoById(Long id, String email);

    TodoDto startTodo(Long id, String email, LocalDateTime startTime);

    TodoDto finishTodo(Long id, String email, LocalDateTime endTime);

    void markTodosAsCompleted();

}
