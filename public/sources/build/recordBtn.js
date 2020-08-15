
"use strict"

/**
 * Defines the style for button in question to finalise the correct placement of said button.
 * 
 * @param {object} btn - Button from DOM, referring to button that will be positioned
 * @param {number} btnBottomMargin - Calculated height the button needs to be from the top of the screen (pending adjustment)
 * @param {number} btnRightMargin - Calculated width the button needs to be from the left of the screen (pending adjustment)
 */
const adjustBtn = (btn, btnBottomMargin, btnRightMargin) => {
    btn.style.position = "sticky";
    btn.style.bottom = `calc(3% + ${btnBottomMargin}px)`;
    btn.style.left = `calc(97% - ${btnRightMargin}px)`;
}

/**
 * Calculates the necessary position of said button for future correct placement.
 * 
 * @param {object} btn - Button from DOM, referring to button that will be positioned
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
}

export { positionBtn }
