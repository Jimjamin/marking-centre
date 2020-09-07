
CREATE DATABASE IF NOT EXISTS marking-centre;

CREATE TABLE IF NOT EXISTS staff (
    email_address text PRIMARY KEY,
    first_name text,
    last_name text,
    is_admin boolean NOT NULL,
    user_password text NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    question_number integer,
    exam_id text,
    student_id text,
    teacher_email text,
    file_locations text NOT NULL,
    grade text,
    comments text,
    PRIMARY KEY (question_number, exam_id, student_id, teacher_email)
);

INSERT INTO staff (email_address, first_name, is_admin, user_password)
VALUES ('admin@corinda.eq.edu.au', 'admin', 'true', '$2b$10$SdcAC4FPeNFK3r45JIxmBuayRVwIY5THfqO.JO8IotUSfBdevhEcW');
