package com.tka.edutrack.api.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tka.edutrack.api.entity.AttendanceRecord;

@Repository
public class AttendanceRecordDao {

    @Autowired
    private SessionFactory factory;

    // Get all attendance records
    public List<AttendanceRecord> getAllAttendanceRecords() {

        Session session = null;
        List<AttendanceRecord> list = null;

        try {
            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(AttendanceRecord.class);

            criteria.setResultTransformer(
                    Criteria.DISTINCT_ROOT_ENTITY
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


    // Get attendance by faculty, subject and date
    public List<AttendanceRecord> getAttendanceByFacultySubjectDate(
            String faculty,
            long subjectId,
            String date) {

        Session session = null;
        List<AttendanceRecord> list = null;

        try {
            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(AttendanceRecord.class);

            criteria.createAlias("user", "u");
            criteria.createAlias("subject", "s");

            criteria.add(
                    Restrictions.eq("u.username", faculty)
            );

            criteria.add(
                    Restrictions.eq("s.id", subjectId)
            );

            criteria.add(
                    Restrictions.eq("date", date)
            );

            criteria.setResultTransformer(
                    Criteria.DISTINCT_ROOT_ENTITY
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


    // Get attendance by faculty
    public List<AttendanceRecord> getAttendanceByFaculty(
            String facultyUsername) {

        Session session = null;
        List<AttendanceRecord> list = null;

        try {
            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(AttendanceRecord.class);

            criteria.createAlias("user", "u");

            criteria.add(
                    Restrictions.eq(
                            "u.username",
                            facultyUsername
                    )
            );

            criteria.setResultTransformer(
                    Criteria.DISTINCT_ROOT_ENTITY
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


    // Get attendance by date and subject
    public List<AttendanceRecord> getAllAttendanceRecords(
            String date,
            long subjectId) {

        Session session = null;
        List<AttendanceRecord> list = null;

        try {
            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(AttendanceRecord.class);

            SimpleExpression dateEq =
                    Restrictions.eq("date", date);

            SimpleExpression subjectEq =
                    Restrictions.eq(
                            "subject.id",
                            subjectId
                    );

            criteria.add(
                    Restrictions.and(
                            dateEq,
                            subjectEq
                    )
            );

            criteria.setResultTransformer(
                    Criteria.DISTINCT_ROOT_ENTITY
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


    // Get attendance records for a particular student
    public List<AttendanceRecord> getAttendanceByStudentUsername(
            String username) {

        Session session = null;
        List<AttendanceRecord> list = null;

        try {
            session = factory.openSession();

            Criteria criteria =
                    session.createCriteria(AttendanceRecord.class);

            criteria.createAlias(
                    "students",
                    "s"
            );

            criteria.add(
                    Restrictions.eq(
                            "s.username",
                            username
                    )
            );

            criteria.setResultTransformer(
                    Criteria.DISTINCT_ROOT_ENTITY
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


    // Save attendance
    public AttendanceRecord saveAttendance(
            AttendanceRecord attendanceRecord) {

        Session session = null;
        AttendanceRecord record = null;

        try {
            session = factory.openSession();

            Transaction transaction =
                    session.beginTransaction();

            session.save(attendanceRecord);

            transaction.commit();

            record = attendanceRecord;

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            if (session != null) {
                session.close();
            }
        }

        return record;
    }
}