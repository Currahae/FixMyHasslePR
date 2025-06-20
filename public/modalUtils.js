export function showModal(modal, cssClassName) {
    modal.classList.add(cssClassName);
}

export function closeModal(event, 
                            modal, 
                            button, 
                            errorMessageElement, 
                            messageClassName, 
                            modalOverlayClassName, 
                            uI, 
                            eI, 
                            pI, 
                            ...cPI) {
    if (event.target === modal || 
        (localStorage.getItem('isLogedIn') === 'true') ||
        event.target === button){
        inputValidState(uI);
        inputValidState(eI);
        inputValidState(pI);
        if (cPI[0]) {
            inputValidState(cPI[0]);
            clearAllInputs(uI, eI, pI, cPI[0]);
        } else {
            clearAllInputs(uI, eI, pI);
        }
        
        errorMessageElement.classList.remove(messageClassName);
        modal.classList.remove(modalOverlayClassName);
    }
}

export function closeCreateTicketModal(event, modal, titleInput, descInput, createButton) {
    if (event.target === modal || (event.target === createButton && isValidIssueTitle(titleInput.value))) {
        inputValidState(titleInput);
        titleInput.value = '';
        descInput.setText('');
        modal.classList.remove('create-ticket-modal-overlay--visible');
    }
}

export function inputInvalidState(input) {
    input.style.borderColor = 'red';
    input.classList.add('shake');

    setTimeout(() => input.classList.remove('shake'), 300);
}

export function inputValidState(input) {
    input.style.borderColor = '';
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidUsername(username) {
    const usernameRegex = /^[\S]{4,25}$/
    return usernameRegex.test(username)
}

export function isValidIssueTitle(title) {
    const titleRegex = /^.{4,}$/
    return titleRegex.test(title)
}

export function clearAllInputs(usernameInput, emailInput, passwordInput, ...confirmPasswordInput) {
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    if (confirmPasswordInput[0]) {
        confirmPasswordInput[0].value = '';
    }
}

export function usernameInputValidation(usernameInput) {
    const username = usernameInput.value.trim();
    if (!isValidUsername(username)) {
        inputInvalidState(usernameInput);
    } else {
        inputValidState(usernameInput);
    }

    return isValidUsername(username)
}

export function emailInputValidation(emailInput) {
    const email = emailInput.value.trim();       
    if (!isValidEmail(email)) {
        inputInvalidState(emailInput);
    } else {
        inputValidState(emailInput);
    }

    return isValidEmail(email)
}

export function titleInputValidation(titleInput) {
    const title = titleInput.value.trim();       
    if (!isValidIssueTitle(title)) {
        inputInvalidState(titleInput);
    } else {
        inputValidState(titleInput);
    }

    return isValidIssueTitle(title)
}