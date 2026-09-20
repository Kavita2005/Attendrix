package com.tka.edutrack.api.service;

import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tka.edutrack.api.dao.AttendanceRecordDao;
import com.tka.edutrack.api.entity.AttendanceRecord;

@Service
public class AttendanceRecordService {

    @Autowired
    private AttendanceRecordDao dao;


    // Get all attendance records
    public List<AttendanceRecord> getAllAttendanceRecords() {

        List<AttendanceRecord> records =
                dao.getAllAttendanceRecords();

        return records;
    }


    // Get attendance by faculty
    public List<AttendanceRecord> getAttendanceByFaculty(
            String facultyUsername) {

        return dao.getAttendanceByFaculty(
                facultyUsername
        );
    }


    // Get attendance by date and subject
    public List<AttendanceRecord> getAllAttendanceRecords(
            String date,
            long subjectId) {

        List<AttendanceRecord> records =
                dao.getAllAttendanceRecords(
                        date,
                        subjectId
                );

        List<AttendanceRecord> distinctAttendanceList =
                records.stream()
                       .collect(
                           Collectors.toCollection(
                               () -> new TreeSet<>(
                                   Comparator.comparing(
                                       AttendanceRecord::getId
                                   )
                               )
                           )
                       )
                       .stream()
                       .collect(
                           Collectors.toList()
                       );

        return distinctAttendanceList;
    }


    // Save attendance
    public AttendanceRecord saveAttendance(
            AttendanceRecord attendanceRecord) {

        String id =
                new SimpleDateFormat(
                        "yyyyMMddHHmmssSSS"
                ).format(
                        new java.util.Date()
                );

        attendanceRecord.setId(id);

        return dao.saveAttendance(
                attendanceRecord
        );
    }


    // Get attendance by faculty, subject and date
    public List<AttendanceRecord>
    getAttendanceByFacultySubjectDate(
            String faculty,
            long subjectId,
            String date) {

        return dao.getAttendanceByFacultySubjectDate(
                faculty,
                subjectId,
                date
        );
    }


    // Get attendance for a particular student
    public List<AttendanceRecord>
    getAttendanceByStudentUsername(
            String username) {

        return dao.getAttendanceByStudentUsername(
                username
        );
    }
}