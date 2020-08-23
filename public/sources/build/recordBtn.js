
"use strict"

import { createTable } from './../modules/table.js';

/**
 * Defines the style for button in question to finalise the correct placement of said button.
 * 
 * @param {object} btn - Button from DOM, referring to button that will be positioned
 * @param {number} btnBottomMargin - Calculated height the button needs to be from the top of the screen (pending adjustment)
 * @param {number} btnRightMargin - Calculated width the button needs to be from the left of the screen (pending adjustment)
 */
const adjustBtn = (btn, btnBottomMargin, btnRightMargin) => {
    btn.style.position = "sticky";
    btn.style.bottom = `calc(1.5% + ${btnBottomMargin}px)`;
    btn.style.left = `calc(96.2% - ${btnRightMargin}px)`;
}

/**
 * Calculates the necessary position of said button for future correct placement.
 * 
 * @param {object} btn - Button from DOM, referring to button that will be positioned
 * @returns {number[]} Value reflecting buttons displacement from top of screen and left to screen
 */
const calcBtn = btn => {
    let btnBottomMargin = document.getElementById("footer").clientHeight;
    const appHeight = document.getElementById("app").clientHeight;
    if (window.innerHeight > appHeight) btnBottomMargin += window.innerHeight - appHeight;
    const btnRightMargin = btn.clientWidth / 2;
    return [btnBottomMargin, btnRightMargin]
}

/**
 * Calls other functions necessary to correctly position upload and comment buttons.
 */
const positionBtn = () => {
    let uploadBtn = document.getElementById("upload");
    let [uploadBtnBottomMargin, uploadBtnRightMargin] = calcBtn(uploadBtn);
    adjustBtn(uploadBtn, uploadBtnBottomMargin, uploadBtnRightMargin);
    const url = `${window.location.protocol}//${window.location.host}/check?email=${localStorage.getItem("userEmail")}&admin=true`;
    fetch(url)
        .then(response => response.json())
        .then(response => { if (!response.admin) document.getElementById("upload").style.display = "none" })
        .catch(error => alert(error.message))
}

const checkTable = () => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const url = `${baseURL}/exams?email=${localStorage.getItem("userEmail")}`;
    fetch(url)
        .then(result => result.json())
        .then(result => createTable(result))
        .catch(error => alert(error.message))
}

export { positionBtn, checkTable }
