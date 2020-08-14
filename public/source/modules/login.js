
"use strict";

/**
 * Properly greets the user with a warm welcome message, and adjusts the logon button to reflect the fact
 * that it is no longer needed (as the user has now logged on).
 * 
 * @param {string} username - User's login username for identification
 */
const welcomeUser = username => {
    document.getElementById("log_form").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("welcome").innerHTML = `Welcome, ${username}!`;
}

/**
     * Hides links that aren't to be seen without prior authentication
     */
const hideLinks = () => {
    document.getElementById("l_jobs").style.display = "none";
    document.getElementById("l_info").style.display = "none";
    document.getElementById("l_reports").style.display = "none";
    document.getElementById("l_marking_centre").style.display = "none";
}

/**
 * Show links if authentication is successful.
 */
const showLinks = () => {
    document.getElementById("l_jobs").style.display = "block";
    document.getElementById("l_info").style.display = "block";
    document.getElementById("l_reports").style.display = "block";
    document.getElementById("l_marking_centre").style.display = "block";
}

/**
 * Sets links in navigation tab to point to correct pages and hides certain links till later.
 * 
 * @param {boolean} hide - Deems if links are to be hidden or not
 */
const setLinks = hide => {
    let relativeLocation = `${window.location.protocol}//${window.location.host}`
    document.getElementById("l_home").href = `${relativeLocation}/`;
    document.getElementById("l_active_job").href = `${relativeLocation}/active_job`;
    document.getElementById("l_job_history").href = `${relativeLocation}/job_history`;
    document.getElementById("l_teacher_info").href = `${relativeLocation}/teacher_info`;
    document.getElementById("l_student_info").href = `${relativeLocation}/student_info`;
    document.getElementById("l_subject_info").href = `${relativeLocation}/subject_info`;
    document.getElementById("l_exam_info").href = `${relativeLocation}/exam_info`;
    document.getElementById("l_marking_centre").href = `${relativeLocation}/marking_centre`;
    if (hide) hideLinks();
    else showLinks();
}

/**
 * Adapts the registration button into a logoff button to reflect the lack of need for a registration
 * button when logged in.
 */
const adaptRegBtn = () => {
    document.getElementById("register").innerHTML = "Logoff";
    document.getElementById("register").onclick = function () {
        document.getElementById("register").onclick = function () {
            document.getElementById('reg_form').style.display = 'block';
        };
        document.getElementById("register").innerHTML = "Register";
        document.getElementById("welcome").innerHTML = "";
        document.getElementById("login").style.display = "block";
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        window.location.href = `${window.location.protocol}//${window.location.host}`;
    };
}

/**
 * Checks to see if user has already logged in during the current session.
 */
const authenticateUser = () => {
    const url = `${window.location.protocol}//${window.location.host}/verify`;
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    let hide = true;

    if (token) {
        let formData = new FormData();
        formData.append("token", token);
        const method = {
            method: "POST",
            body: formData,
        };
        fetch(url, method)
            .then(() => {
                welcomeUser(username);
                if (window.location.pathname !== "/teacher_info") script.adaptRegBtn();
                hide = false;
            })
            .catch(err => alert(err.message))
    }
    setLinks(hide);

    // If not on home page, and not currently logged in, return to home page
    if (window.location.pathname !== "/" && !username) window.location.href = `${window.location.protocol}//${window.location.host}`;
}

/**
 * Allows the user to login with their previously registered account.
 */
const userLogin = () => {
    const url = `${window.location.protocol}//${window.location.host}/login`;
    const username = document.getElementById("input_username_l").value;
    const password = document.getElementById("input_password_l").value;
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const method = {
        method: "POST",
        body: formData,
    };
    fetch(url, method)
        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("token", res[0]);
            alert("You have successfully logged in");
            document.getElementById("input_username_l").value = "";
            document.getElementById("input_password_l").value = "";
            welcomeUser(username);
            if (window.location.pathname !== "/teacher_info") adaptRegBtn();
            setLinks(false);
        })
        .catch(err => alert(err.message))
}

export { authenticateUser, userLogin }
