package com.akashsen.todo.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akashsen.todo.dto.LoginDto;
import com.akashsen.todo.dto.RegisterDto;
import com.akashsen.todo.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDto dto) {
        return ResponseEntity.ok(authService.login(dto)); // ✅ Return token as JSON
    }

    // ✅ Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto dto) {
        authService.register(dto);
        return ResponseEntity.ok("Registration successful");
    }
}
