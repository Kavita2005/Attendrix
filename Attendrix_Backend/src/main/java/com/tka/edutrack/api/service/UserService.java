package com.tka.edutrack.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.edutrack.api.dao.UserDao;
import com.tka.edutrack.api.entity.User;
import com.tka.edutrack.api.model.LoginRequest;

@Service
public class UserService {

    @Autowired
    private UserDao dao;

    // Login
    public User loginUser(LoginRequest request) {
        return dao.loginUser(request);
    }

    // Register user
    public User registerUser(User user) {
        return dao.registerUser(user);
    }

    // Get user by username
    public User getUserByName(String username) {
        return dao.getUserByName(username);
    }

    // Get all users
    public List<User> getAllUser() {
        return dao.getAllUser();
    }

    // Update user
    public User updateUser(User user) {
        return dao.updateUser(user);
    }

    // Delete user
    public String deleteUserById(String username) {
        return dao.deleteUserById(username);
    }

    // Get all admins
    public List<User> getAllAdmins() {
        return dao.getAllAdmins();
    }

    // Get all faculty
    public List<User> getAllFaculties() {
        return dao.getAllFaculties();
    }

    // Get pending students
    public List<User> getPendingStudents() {
        return dao.getPendingStudents();
    }

    // Approve or reject student
    public User updateStudentStatus(String username, String status) {
        return dao.updateStudentStatus(username, status);
    }
}