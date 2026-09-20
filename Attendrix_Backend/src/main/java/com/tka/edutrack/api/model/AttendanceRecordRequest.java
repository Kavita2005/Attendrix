package com.tka.edutrack.api.model;

import java.util.List;
import java.util.Set;

import com.tka.edutrack.api.entity.Student;


public class AttendanceRecordRequest {
	
	private String username;
	private Long subjectId;
	private String date;
	private String time;
    private int numberOfStudents;  
	private Set<Student> students;

	public AttendanceRecordRequest() {
		// TODO Auto-generated constructor stub
	}

	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	
	public Set<Student> getStudents() {
		return students;
	}

	public void setStudents(Set<Student> students) {
		this.students = students;
	}

	public int getNumberOfStudents() {
		return numberOfStudents;
	}

	public void setNumberOfStudents(int numberOfStudents) {
		this.numberOfStudents = numberOfStudents;
	}
	
	

}
