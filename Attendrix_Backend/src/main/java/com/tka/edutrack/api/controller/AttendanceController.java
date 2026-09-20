package com.tka.edutrack.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tka.edutrack.api.entity.AttendanceRecord;
import com.tka.edutrack.api.entity.Subject;
import com.tka.edutrack.api.entity.User;
import com.tka.edutrack.api.model.AttendanceRecordRequest;
import com.tka.edutrack.api.service.AttendanceRecordService;
import com.tka.edutrack.api.service.SubjectService;
import com.tka.edutrack.api.service.UserService;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("http://localhost:5173")

public class AttendanceController {

	@Autowired
	private AttendanceRecordService attendanceRecordService;

	@Autowired
	private UserService userService;

	@Autowired
	private SubjectService subjectService;

	@GetMapping("/get-all-attendance-records")
	public List<AttendanceRecord> getAllAttendanceRecords() {
		return attendanceRecordService.getAllAttendanceRecords();
	}
	
	 @GetMapping("/get-attendance-by-faculty/{facultyUsername}")
	    public List<AttendanceRecord> getAttendanceByFaculty(@PathVariable String facultyUsername) {
	        return attendanceRecordService.getAttendanceByFaculty(facultyUsername);
	    }
	
	
	@GetMapping("/get-attendance-by-date-subjet/{date}/{subjectId}")
	public List<AttendanceRecord> getAllAttendanceRecords(@PathVariable String date,@PathVariable long subjectId){
		return attendanceRecordService.getAllAttendanceRecords(date,subjectId);
	}
	
	@GetMapping("/get-attendance/{faculty}/{subjectId}/{date}")
	public List<AttendanceRecord> getAttendanceByFacultySubjectDate(
	        @PathVariable String faculty, 
	        @PathVariable long subjectId, 
	        @PathVariable String date) {
	    return attendanceRecordService.getAttendanceByFacultySubjectDate(faculty, subjectId, date);
	}
	@GetMapping("/get-attendance-by-student/{username}")
	public List<AttendanceRecord> getAttendanceByStudent(
	        @PathVariable String username) {

	    return attendanceRecordService.getAttendanceByStudentUsername(username);
	}


	@PostMapping("/take-attendance")
	public AttendanceRecord createAttendanceRecord(@RequestBody AttendanceRecordRequest request) {
		
		User user = userService.getUserByName(request.getUsername());
		Subject subject = subjectService.getSubjectById(request.getSubjectId());
		
		AttendanceRecord attendanceRecord = new AttendanceRecord();
		attendanceRecord.setUser(user);
		attendanceRecord.setSubject(subject);
		attendanceRecord.setDate(request.getDate());
		attendanceRecord.setTime(request.getTime());
		attendanceRecord.setStudents(request.getStudents());
		attendanceRecord.setNumberOfStudents(request.getStudents().size());

		System.out.println(attendanceRecord);
		return attendanceRecordService.saveAttendance(attendanceRecord);
	}
}
