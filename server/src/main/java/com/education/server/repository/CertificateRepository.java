package com.education.server.repository;

import com.education.server.entity.CertificateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<CertificateEntity, Long> {
    Optional<CertificateEntity> findByStudentIdAndCourseId(Long studentId, Long courseId);
    Optional<CertificateEntity> findByCertificateNumber(String certificateNumber);
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
    List<CertificateEntity> findAllByStudentId(Long studentId);
}