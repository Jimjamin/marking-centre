
CREATE DATABASE IF NOT EXISTS marking-centre;

CREATE TABLE IF NOT EXISTS staff (
    email_address text PRIMARY KEY,
    first_name text,
    last_name text,
    is_admin boolean NOT NULL,
    user_password text NOT NULL
);

CREATE TABLE IF NOT EXISTS classroom (
    student_id text PRIMARY KEY,
    first_name text,
    last_name text
);

CREATE TABLE IF NOT EXISTS assessment (
    exam_id text PRIMARY KEY,
    exam_name text
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
