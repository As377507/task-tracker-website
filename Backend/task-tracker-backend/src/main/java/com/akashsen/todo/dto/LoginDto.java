package com.akashsen.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

    private String email;
    private String password;

    public String getUsername() {
        return email;  // ✅ use email as username
    }

    public String getPassword() {
        return password;
    }
}
