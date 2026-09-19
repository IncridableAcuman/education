package com.education.server.event;

import com.education.server.entity.UserEntity;

public record CourseCompletedEvent(
        Long courseId,
        UserEntity student
) {}