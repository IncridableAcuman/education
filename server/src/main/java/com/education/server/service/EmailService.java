package com.education.server.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Async
    public void sendCertificateEmail(
            String toEmail,
            String studentName,
            String courseTitle,
            String certificateNumber,
            byte[] pdfBytes
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name()
            );

            helper.setTo(toEmail);
            helper.setSubject("Tabriklaymiz! Kursni muvaffaqiyatli yakunladingiz — Sertifikat");

            String htmlBody = """
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2>Tabriklaymiz, %s!</h2>
                        <p>Siz <strong>"%s"</strong> kursini muvaffaqiyatli 100%% tugatdingiz.</p>
                        <p>Sizning sertifikat raqamingiz: <strong>%s</strong></p>
                        <p>Sertifikatingiz PDF formatda ushbu xatga biriktirilgan.</p>
                        <br/>
                        <p>O'qishlaringizda omad tilaymiz!</p>
                    </div>
                    """.formatted(studentName, courseTitle, certificateNumber);

            helper.setText(htmlBody, true);

            String filename = "Certificate-" + certificateNumber + ".pdf";
            helper.addAttachment(filename, new ByteArrayResource(pdfBytes));

            mailSender.send(message);
            log.info("Sertifikat email orqali yuborildi: {}", toEmail);

        } catch (MessagingException e) {
            log.error("Email yuborishda xatolik yuz berdi [Email: {}]: {}", toEmail, e.getMessage());
        }
    }
}