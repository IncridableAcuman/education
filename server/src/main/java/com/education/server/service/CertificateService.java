package com.education.server.service;

import com.education.server.dto.CertificateDto;
import com.education.server.dto.ProgressDto;
import com.education.server.entity.CertificateEntity;
import com.education.server.entity.CourseEntity;
import com.education.server.entity.UserEntity;
import com.education.server.exception.CustomBadRequestException;
import com.education.server.exception.CustomNotFoundException;
import com.education.server.repository.CertificateRepository;
import com.education.server.repository.CourseRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.awt.Color;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CertificateService {
    private final CertificateRepository certificateRepository;
    private final CourseRepository courseRepository;
    private final ProgressService progressService;
    private final EmailService emailService;

    @Value("${server.servlet.context-path:/api/v1}")
    private String contextPath;

    @Transactional
    public CertificateDto.Response issueCertificateIfEligible(Long courseId, UserEntity student) {
        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new CustomNotFoundException("Kurs topilmadi: " + courseId));

        ProgressDto.CourseProgressResponse progress = progressService.getCourseProgress(courseId, student);
        if (progress.percentage() < 100.0) {
            throw new CustomBadRequestException("Sertifikat olish uchun kursni 100% tugatishingiz kerak");
        }

        boolean isNew = !certificateRepository.existsByStudentIdAndCourseId(student.getId(), courseId);

        CertificateEntity certificate = certificateRepository.findByStudentIdAndCourseId(student.getId(), courseId)
                .orElseGet(() -> {
                    CertificateEntity newCert = CertificateEntity.builder()
                            .certificateNumber("CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                            .student(student)
                            .course(course)
                            .build();
                    return certificateRepository.save(newCert);
                });

        if (isNew) {
            byte[] pdfBytes = generatePdfCertificate(certificate.getCertificateNumber());
            emailService.sendCertificateEmail(
                    student.getEmail(),
                    student.getFullName(),
                    course.getTitle(),
                    certificate.getCertificateNumber(),
                    pdfBytes
            );
        }

        return CertificateDto.Response.from(certificate, contextPath);
    }

    @Transactional(readOnly = true)
    public CertificateDto.Response getCertificateByCourse(Long courseId, UserEntity student) {
        CertificateEntity certificate = certificateRepository.findByStudentIdAndCourseId(student.getId(), courseId)
                .orElseThrow(() -> new CustomNotFoundException("Sertifikat hali generatsiya qilinmagan"));
        return CertificateDto.Response.from(certificate, contextPath);
    }

    @Transactional(readOnly = true)
    public List<CertificateDto.Response> getMyCertificates(UserEntity student) {
        return certificateRepository.findAllByStudentId(student.getId()).stream()
                .map(cert -> CertificateDto.Response.from(cert, contextPath))
                .toList();
    }

    public byte[] generatePdfCertificate(String certificateNumber) {
        CertificateEntity cert = certificateRepository.findByCertificateNumber(certificateNumber)
                .orElseThrow(() -> new CustomNotFoundException("Sertifikat topilmadi: " + certificateNumber));

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4.rotate(), 36, 36, 36, 36);
            PdfWriter.getInstance(document, out);
            document.open();

            // Dizayn va shriftlar
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 32, Color.DARK_GRAY);
            Font subtitleFont = FontFactory.getFont(FontFactory.HELVETICA, 16, Color.GRAY);
            Font nameFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 26, new Color(41, 128, 185));
            Font courseFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, Color.BLACK);
            Font metaFont = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.DARK_GRAY);

            Paragraph title = new Paragraph("TA'LIM SERTIFIKATI", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            Paragraph certText = new Paragraph("Ushbu sertifikat munosib ravishda topshiriladi:", subtitleFont);
            certText.setAlignment(Element.ALIGN_CENTER);
            certText.setSpacingAfter(15);
            document.add(certText);

            Paragraph studentName = new Paragraph(cert.getStudent().getFullName().toUpperCase(), nameFont);
            studentName.setAlignment(Element.ALIGN_CENTER);
            studentName.setSpacingAfter(20);
            document.add(studentName);

            Paragraph courseText = new Paragraph("quyidagi kursni muvaffaqiyatli yakunlagani uchun:", subtitleFont);
            courseText.setAlignment(Element.ALIGN_CENTER);
            courseText.setSpacingAfter(10);
            document.add(courseText);

            Paragraph courseTitle = new Paragraph("\"" + cert.getCourse().getTitle() + "\"", courseFont);
            courseTitle.setAlignment(Element.ALIGN_CENTER);
            courseTitle.setSpacingAfter(40);
            document.add(courseTitle);

            String formattedDate = cert.getIssuedAt().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"));
            Paragraph metaInfo = new Paragraph(
                    "Sertifikat raqami: " + cert.getCertificateNumber() + "  |  Berilgan vaqti: " + formattedDate,
                    metaFont
            );
            metaInfo.setAlignment(Element.ALIGN_CENTER);
            document.add(metaInfo);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new CustomBadRequestException("PDF generatsiyasida xatolik yuz berdi: " + e.getMessage());
        }
    }
}