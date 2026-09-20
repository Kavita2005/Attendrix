package com.tka.edutrack.api.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tka.edutrack.api.entity.Student;
import com.tka.edutrack.api.entity.User;
import com.tka.edutrack.api.model.LoginRequest;

@Repository
public class UserDao {

    @Autowired
    private SessionFactory factory;

    @Autowired
    private StudentDao studentDao;


    // =====================================================
    // LOGIN USER
    // =====================================================

    public User loginUser(LoginRequest request) {

        Session session = null;
        User user = null;

        try {

            session = factory.openSession();

            user = session.get(
                    User.class,
                    request.getUsername().trim()
            );

            if (user != null) {

                // Check password
                if (user.getPassword().equals(
                        request.getPassword().trim())) {

                    // Student must be approved by admin
                    if ("student".equalsIgnoreCase(user.getRole())) {

                        if (!"APPROVED".equalsIgnoreCase(
                                user.getStatus())) {

                            return null;
                        }
                    }

                    return user;
                }
            }

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return null;
    }


    // =====================================================
    // DELETE USER
    // =====================================================

    public String deleteUserById(String username) {

        Session session = null;
        String msg = null;

        try {

            session = factory.openSession();

            User user = session.get(User.class, username);

            if (user != null) {

                Transaction transaction =
                        session.beginTransaction();

                session.delete(user);

                transaction.commit();

                msg = "deleted";

            } else {

                msg = "User not found";
            }

        } catch (Exception e) {

            e.printStackTrace();

            msg = null;

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return msg;
    }


    // =====================================================
    // UPDATE USER
    // =====================================================

    public User updateUser(User user) {

        Session session = null;

        try {

            session = factory.openSession();

            Transaction transaction =
                    session.beginTransaction();

            session.update(user);

            transaction.commit();

            return user;

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }


    // =====================================================
    // GET ALL USERS
    // =====================================================

    public List<User> getAllUser() {

        Session session = null;
        List<User> list = null;

        try {

            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(User.class);

            list = criteria.list();

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return list;
    }


    // =====================================================
    // GET USER BY USERNAME
    // =====================================================

    public User getUserByName(String username) {

        Session session = null;
        User user = null;

        try {

            session = factory.openSession();

            user = session.get(User.class, username);

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return user;
    }


    // =====================================================
    // REGISTER USER
    // =====================================================

    public User registerUser(User user) {

        Session session = null;
        User user2 = null;

        try {

            session = factory.openSession();

            user2 = session.get(
                    User.class,
                    user.getUsername()
            );

            // Username does not already exist
            if (user2 == null) {

                // Student needs admin approval
                if ("student".equalsIgnoreCase(user.getRole())) {

                    user.setStatus("PENDING");

                } else {

                    // Admin and Faculty are approved directly
                    user.setStatus("APPROVED");
                }

                Transaction transaction =
                        session.beginTransaction();

                session.save(user);

                transaction.commit();

                return user;
            }

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return null;
    }


    // =====================================================
    // GET ALL ADMINS
    // =====================================================

    public List<User> getAllAdmins() {

        Session session = null;
        List<User> list = null;

        try {

            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(User.class);

            criteria.add(
                    Restrictions.eq("role", "admin")
            );

            list = criteria.list();

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return list;
    }


    // =====================================================
    // GET ALL FACULTY
    // =====================================================

    public List<User> getAllFaculties() {

        Session session = null;
        List<User> list = null;

        try {

            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(User.class);

            criteria.add(
                    Restrictions.eq("role", "faculty")
            );

            list = criteria.list();

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return list;
    }


    // =====================================================
    // GET PENDING STUDENTS
    // =====================================================

    public List<User> getPendingStudents() {

        Session session = null;
        List<User> list = null;

        try {

            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(User.class);

            // Only students
            criteria.add(
                    Restrictions.eq("role", "student")
            );

            // Only pending students
            criteria.add(
                    Restrictions.eq("status", "PENDING")
            );

            list = criteria.list();

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return list;
    }


    // =====================================================
    // APPROVE / REJECT STUDENT
    // =====================================================

    public User updateStudentStatus(
            String username,
            String status) {

        Session session = null;

        try {

            session = factory.openSession();

            User user = session.get(
                    User.class,
                    username
            );

            // Check user exists and is a student
            if (user != null &&
                    "student".equalsIgnoreCase(
                            user.getRole())) {

                // ==========================================
                // UPDATE USER STATUS
                // ==========================================

                user.setStatus(status);

                Transaction transaction =
                        session.beginTransaction();

                session.update(user);

                transaction.commit();


                // ==========================================
                // CREATE STUDENT AFTER APPROVAL
                // ==========================================

                if ("APPROVED".equalsIgnoreCase(status)) {

                    // Check whether Student already exists
                    Student existingStudent =
                            studentDao.getStudentByUsername(
                                    username
                            );

                    // Create Student only if it doesn't exist
                    if (existingStudent == null) {

                        Student student =
                                new Student();

                        // Same username as User
                        student.setUsername(
                                user.getUsername()
                        );

                        // Full name
                        student.setName(
                                user.getFirstName()
                                + " "
                                + user.getLastName()
                        );

                        // Email
                        student.setEmail(
                                user.getEmail()
                        );

                        // Save Student
                        studentDao.createStudent(
                                student
                        );
                    }
                }

                return user;
            }

        } catch (Exception e) {

            e.printStackTrace();

        } finally {

            if (session != null) {
                session.close();
            }
        }

        return null;
    }

}