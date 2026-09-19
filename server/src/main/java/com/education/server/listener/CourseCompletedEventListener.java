package com.education.server.listener;

import com.education.server.event.CourseCompletedEvent;
import com.education.server.service.CertificateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class CourseCompletedEventListener {
    private final CertificateService certificateService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleCourseCompleted(CourseCompletedEvent event) {
        log.info("CourseCompletedEvent qabul qilindi. Kurs ID: {}, Talaba: {}", event.courseId(), event.student().getEmail());

        try {
            certificateService.issueCertificateIfEligible(event.courseId(), event.student());
        } catch (Exception e) {
            log.error("Sertifikat yaratishda xatolik yuz berdi [Kurs ID: {}]: {}", event.courseId(), e.getMessage());
        }
    }
}