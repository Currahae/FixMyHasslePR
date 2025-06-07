export async function userExistsValidation(usernameInput, emailInput, errorMessageElement) {
    const response = await fetch('/users');
    const users = await response.json();
    const userExists = users.some(user => user.username === usernameInput.value.trim() ||
                                         user.email === emailInput.value.trim());
    if (userExists) {
        console.log('user already exists');
        errorMessageElement.classList.add('sign-up-modal__error-message--visible');
        return true;
    } else {
        console.log('user dont exists');
        errorMessageElement.classList.remove('sign-up-modal__error-message--visible');
        return false;
    }
    
}