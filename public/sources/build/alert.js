
"use strict";

const alertMessage = message => {
    let modalContainer = document.createElement("div");
    modalContainer.classList.add("w3-modal");
    modalContainer.id = "alertBox";
    let modalContent = document.createElement("div");
    modalContent.classList.add("w3-modal-content");
    modalContent.classList.add("w3-animate-zoom");
    modalContent.classList.add("w3-round-xlarge");
    let messageContainer = document.createElement("div");
    messageContainer.classList.add("w3-container");
    messageContainer.classList.add("w3-center");
    let headingContent = document.createElement("h3");
    headingContent.innerHTML = "Update";
    let messageContent = document.createElement("p");
    messageContent.innerHTML = message;
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("w3-container");
    buttonContainer.classList.add("w3-center");
    buttonContainer.id = "buttonContainer";
    let closeButton = document.createElement("button");
    closeButton.innerHTML = "Okay";
    closeButton.addEventListener("click", () => modalContainer.remove());
    closeButton.classList.add("w3-button");
    closeButton.classList.add("w3-round-xlarge");
    closeButton.id = "alertCloseBtn";
    messageContainer.appendChild(headingContent);
    messageContainer.appendChild(messageContent);
    messageContainer.style.color = "black";
    buttonContainer.appendChild(closeButton);
    modalContent.appendChild(messageContainer);
    modalContent.appendChild(buttonContainer);
    modalContent.style.width = "35%";
    modalContainer.appendChild(modalContent);
    modalContainer.style.display = "block";
    document.getElementById("body").appendChild(modalContainer);
}

const promptMessage = (message, onConfirmFunction) => {
    alertMessage(message);
    document.getElementById("alertCloseBtn").innerHTML = "Confirm";
    document.getElementById("alertCloseBtn").addEventListener("click", onConfirmFunction);
    document.getElementById("alertCloseBtn").id = "confirmPromptBtn";
    let cancelButton = document.createElement("button");
    cancelButton.innerHTML = "Cancel";
    cancelButton.addEventListener("click", () => document.getElementById("alertBox").remove());
    cancelButton.classList.add("w3-button");
    cancelButton.classList.add("w3-round-xlarge");
    cancelButton.id = "cancelPromptBtn";
    document.getElementById("buttonContainer").appendChild(cancelButton);
}

export { alertMessage, promptMessage }
