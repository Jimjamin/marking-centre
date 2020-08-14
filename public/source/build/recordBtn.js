
"use strict"

/**
 * Defines the style for button in question to finalise the correct placement of said button.
 * 
 * @param {object} btn - Button from DOM, referring to button that will be positioned
 * @param {number} btnBottomMargin - Calculated height the button needs to be from the top of the screen (pending adjustment)
 * @param {number} btnRightMargin - Calculated width the button needs to be from the left of the screen (pending adjustment)
 */
adjustBtn = (btn, btnBottomMargin, btnRightMargin) => {
    btn.style.bottom = `calc(3% + ${btnBottomMargin}px)`;
    btn.style.left = `calc(97% - ${btnRightMargin}px)`;
}

/**
 * Calculates the necessary position of said button for future correct placement.
 * 
 * @param {object} btn - Button from DOM, referring to button that will be positioned
 */
calcBtn = btn => {
    let btnBottomMargin = document.getElementById("closing").clientHeight;
    const appHeight = document.getElementById("app").clientHeight;
    if (window.innerHeight > appHeight) btnBottomMargin += window.innerHeight - appHeight;
    const btnRightMargin = btn.clientWidth / 2;
    return [btnBottomMargin, btnRightMargin]
}

/**
 * Calls other functions necessary to correctly position upload and comment buttons.
 */
positionBtn = () => {
    let uploadBtn = document.getElementById("upload");
    [uploadBtnBottomMargin, uploadBtnRightMargin] = script.calcBtn(uploadBtn);
    script.adjustBtn(uploadBtn, uploadBtnBottomMargin, uploadBtnRightMargin);

    if (window.location.pathname === "/marking_centre") {
        let commentBtn = document.getElementById("upload");
        [commentBtnBottomMargin, commentBtnRightMargin] = script.calcBtn(commentBtn);
        script.adjustBtn(commentBtn, commentBtnBottomMargin, commentBtnRightMargin);
    }
}

export { positionBtn }
