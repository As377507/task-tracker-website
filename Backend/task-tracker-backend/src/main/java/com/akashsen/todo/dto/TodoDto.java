package com.akashsen.todo.dto;

import java.time.LocalDateTime;

import com.akashsen.todo.enums.Priority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {

    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private String userEmail;

    private Priority priority; // <-- You need this
    private String estimatedTime; // <-- You need this
    private String status; // <-- You need this

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "TodoDto{"
                + "title='" + title + '\''
                + ", description='" + description + '\''
                + ", priority=" + priority
                + ", estimatedTime=" + estimatedTime
                + ", status='" + status + '\''
                + '}';
    }

}
