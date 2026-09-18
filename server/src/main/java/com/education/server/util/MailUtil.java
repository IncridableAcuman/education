package com.education.server.util;

import com.education.server.dto.EmailPayload;
import com.education.server.exception.CustomBadRequestException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MailUtil {
    private final JavaMailSender mailSender;

    @Async
    public void sendMail(EmailPayload payload){
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(payload.to());
            helper.setSubject(payload.subject());
            helper.setText(payload.text(),true);

            mailSender.send(message);
        } catch (MessagingException e){
            throw new CustomBadRequestException(e.getMessage());
        }
    }
}
