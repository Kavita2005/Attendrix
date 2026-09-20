package com.tka.edutrack.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tka.edutrack.api.entity.User;
import com.tka.edutrack.api.model.LoginRequest;
import com.tka.edutrack.api.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserService service;


    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login-user")
    public Object loginUser(@RequestBody LoginRequest request) {

        System.out.println("Login Request --> " + request);

        User user = service.loginUser(request);

        if (user != null) {
            return user;
        } else {
            return null;
        }
    }


    // =========================
    // REGISTER USER
    // =========================
    @PostMapping("/register-user")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        User registerUser = service.registerUser(user);

        if (registerUser != null) {

            return new ResponseEntity<>(
                    "Registered",
                    HttpStatus.CREATED
            );

        } else {

            return new ResponseEntity<>(
                    "Something Went Wrong",
                    HttpStatus.OK
            );
        }
    }


    // =========================
    // GET USER BY USERNAME
    // =========================
    @GetMapping("/get-user-by-username/{username}")
    public User getUserById(@PathVariable String username) {

        return service.getUserByName(username);
    }


    // =========================
    // GET ALL USERS
    // =========================
    @GetMapping("/get-all-user")
    public List<User> getAllUser() {

        return service.getAllUser();
    }


    // =========================
    // GET ALL ADMINS
    // =========================
    @GetMapping("/get-all-admin")
    public List<User> getAllAdmins() {

        return service.getAllAdmins();
    }


    // =========================
    // GET ALL FACULTY
    // =========================
    @GetMapping("/get-all-faculty")
    public List<User> getAllFaculties() {

        return service.getAllFaculties();
    }


    // =========================
    // DELETE USER
    // =========================
    @DeleteMapping("/delete-user-by-username")
    public String deleteUserById(@RequestParam String username) {

        return service.deleteUserById(username);
    }


    // =========================
    // UPDATE USER
    // =========================
    @PutMapping("/update-user")
    public User updateUser(@RequestBody User user) {

        return service.updateUser(user);
    }


    // =========================
    // GET PENDING STUDENTS
    // =========================
    @GetMapping("/get-pending-students")
    public List<User> getPendingStudents() {

        return service.getPendingStudents();
    }


    // =========================
    // APPROVE / REJECT STUDENT
    // =========================
    @PutMapping("/update-student-status")
    public User updateStudentStatus(
            @RequestParam String username,
            @RequestParam String status) {

        return service.updateStudentStatus(username, status);
    }
}