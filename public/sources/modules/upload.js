
"use strict";

import { alertMessage } from '../build/alert.js';

/**
 * Uploads CSV file to server to be handled there
 * 
 * @param {object} fileUploadInput - File to be uploaded
 * @param {string} pathToUpload - Server API to call for uploaded file
 */
const uploadFiles = (fileUploadInput, pathToUpload) => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}${pathToUpload}?type=file`;
    let filesToUpload = new FormData();
    filesToUpload.append("recordToUpload", fileUploadInput);
    const method = {
        method: "POST",
        body: filesToUpload
    }
    fetch(url, method)
        .then(response => response.json())
        .then(response => window.location.href = `${baseURL}${pathToUpload}`)
        .catch(error => alertMessage(error.message))
}

/**
 * Allows for the uploading of a form to the server (no CSV file)
 * 
 * @param {object} formToUpload - Form containing all field data to be POSTed to server
 * @param {string} pathToUpload - Server API to call for uploading of data
 */
const uploadForms = (formToUpload, pathToUpload) => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}${pathToUpload}?type=form`;
    const method = {
        method: "POST",
        body: formToUpload
    }
    fetch(url, method)
        .then(response => response.json())
        .then(response => window.location.href = `${baseURL}${pathToUpload}`)
        .catch(error => alertMessage(error.message))
}

/**
 * Validates that the exam form is in correct form
 * 
 * @returns {boolean} If the exam form is valid
 */
const validateExamForm = () => {
    if (!document.getElementById("studentIDInput").value) return false;
    if (!document.getElementById("examIDInput").value) return false;
    if (!document.getElementById("teacherEmailAddressInput").value) return false;
    if (!document.getElementById("questionNumberInput").value) return false;
    if (!document.getElementById("questionFileInput").value) return false;
    return true;
}

/**
 * Validates that the user form is in correct form
 *
 * @returns {boolean} If the user form is valid
 */
const validateUserForm = () => {
    if (!document.getElementById("emailAddressInput").value) return false;
    if (document.getElementById("passwordInput").length < 8) return false;
    if (document.getElementById("passwordConfirmInput").value !== document.getElementById("passwordInput").value) return false;
    return true;
}

/**
 * Checks for the value of the admin radio buttons in the user form
 * 
 * @returns {string} Value of the checked admin radio button in said form
 */
const checkForAdminStatus = () => {
    const radioBtnList = document.getElementsByName("adminCheck");
    for (let radioBtn in radioBtnList) if (radioBtnList[radioBtn].checked) return radioBtnList[radioBtn].value;
}

/**
 * If exam upload is in the style of a form (not a CSV) upload to server with this function
 * 
 * @param {string} pathToUpload - Server API to call for uploading exam form
 */
const uploadExamForm = pathToUpload => {
    if (!validateExamForm()) {
        alertMessage("You have an error in your upload");
        return;
    }
    let formToUpload = new FormData();
    formToUpload.append("studentID", document.getElementById("studentIDInput").value);
    formToUpload.append("examID", document.getElementById("examIDInput").value);
    formToUpload.append("teacherEmailAddress", document.getElementById("teacherEmailAddressInput").value);
    formToUpload.append("questionNumber", document.getElementById("questionNumberInput").value);
    formToUpload.append("fileLocation", document.getElementById("questionFileInput").value);
    uploadForms(formToUpload, pathToUpload);
}

/**
 * If exam upload is in CSV format upload to server with this function
 */
const uploadExam = () => {
    const csvExists = document.getElementById("userExamUpload").files.length > 0;
    const pathToUpload = "/upload/exams";
    if (csvExists) {
        const fileUploadInput = document.getElementById("userExamUpload").files[0];
        uploadFiles(fileUploadInput, pathToUpload);
    } else uploadExamForm(pathToUpload);
}

/**
 * If user upload is in the style of a form (not a CSV) upload to server with this function
 *
 * @param {string} pathToUpload - Server API to call for uploading user form
 */
const uploadUserForm = pathToUpload => {
    if (!validateUserForm()) {
        alertMessage("You have an error in your upload");
        return;
    }
    let formToUpload = new FormData();
    formToUpload.append("givenName", document.getElementById("givenNameInput").value);
    formToUpload.append("familyName", document.getElementById("familyNameInput").value);
    formToUpload.append("emailAddress", document.getElementById("emailAddressInput").value);
    formToUpload.append("password", document.getElementById("passwordInput").value);
    formToUpload.append("passwordConfirm", document.getElementById("passwordInput").value);
    const adminStatus = checkForAdminStatus();
    formToUpload.append("isAdmin", adminStatus);
    uploadForms(formToUpload, pathToUpload);
}

/**
 * If user upload is in CSV format upload to server with this function
 */
const uploadUser = () => {
    const csvExists = document.getElementById("userFileUpload").files.length > 0;
    const pathToUpload = "/upload/users";
    if (csvExists) {
        const fileUploadInput = document.getElementById("userFileUpload").files[0];
        uploadFiles(fileUploadInput, pathToUpload);
    } else uploadUserForm(pathToUpload);
}

export { uploadUser, uploadExam }
