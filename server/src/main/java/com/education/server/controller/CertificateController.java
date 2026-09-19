package com.education.server.controller;

import com.education.server.dto.CertificateDto;
import com.education.server.entity.UserEntity;
import com.education.server.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certificates")
@RequiredArgsConstructor
public class CertificateController {
    private final CertificateService certificateService;

    @PostMapping("/issue/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<CertificateDto.Response> issueCertificate(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.ok(certificateService.issueCertificateIfEligible(courseId, student));
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<CertificateDto.Response> getCertificateByCourse(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.ok(certificateService.getCertificateByCourse(courseId, student));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<CertificateDto.Response>> getMyCertificates(
            @AuthenticationPrincipal UserEntity student
    ) {
        return ResponseEntity.ok(certificateService.getMyCertificates(student));
    }

    @GetMapping("/download/{certificateNumber}")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable String certificateNumber) {
        byte[] pdfBytes = certificateService.generatePdfCertificate(certificateNumber);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"certificate-" + certificateNumber + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}