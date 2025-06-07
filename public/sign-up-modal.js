import {
    inputInvalidState,
    inputValidState,
    isValidEmail,
    isValidUsername,
    clearAllInputs,
    usernameInputValidation,
    emailInputValidation,
    showModal,
    closeModal
} from './modalUtils.js'

import { userExistsValidation } from './userService.js'

const userProfileButtonUnsigned = document.querySelector('.navbar__user-profile');
const signUpModalOverlay = document.querySelector('.sign-up-modal-overlay');
const createTicketButton = document.querySelector('.navbar__create-ticket-button')
const signUpButton = document.querySelector('.sign-up-modal__button');

const usernameInput = document.querySelector('#sign_up_name');
const emailInput = document.querySelector('#sign_up_email');
const passwordInput = document.querySelector('#sign_up_pass');
const confirmPasswordInput = document.querySelector('#sign_up_conf_pass');
const errorMessage = document.querySelector('.sign-up-modal__error-message');

const logInButton = document.querySelector('.sign-up-modal__log-in-redirect-link');
const logInModalOverlay = document.querySelector('.log-in-modal-overlay');

const errorMessageVisibleClassName = 'sign-up-modal__error-message--visible';
const modalOverlayVisibleClassName = 'sign-up-modal-overlay--visible';

function passwordConfirmationInputValidation() {
    if ((passwordInput.value.trim() !== confirmPasswordInput.value.trim()) || 
        passwordInput.value.trim() === '' ||
        confirmPasswordInput.value.trim() === '') {
        inputInvalidState(passwordInput);
        inputInvalidState(confirmPasswordInput);

        return false;
    } else {
        inputValidState(passwordInput);
        inputValidState(confirmPasswordInput);
        return true;
    }
}

function createNewUser() {
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameInput.value.trim(),
            emailInput: emailInput.value.trim(),
            passwordInput: passwordInput.value.trim()
        })
    }).then(answ => console.warn(answ.status, answ.statusText))
}

signUpButton.addEventListener('click', async (event) => {
    const isEmailValid = emailInputValidation(emailInput);
    const isUsernameValid = usernameInputValidation(usernameInput);
    const isPasswordConfirmationValid = passwordConfirmationInputValidation();

    if (isEmailValid
        && isUsernameValid
        && isPasswordConfirmationValid) {
            const isUserExists = await userExistsValidation(usernameInput, emailInput);
            if (!isUserExists) {
                console.log('user dont exists');
                errorMessage.classList.remove('sign-up-modal__error-message--visible');
                localStorage.setItem('isLogedIn', 'true')
                createNewUser();
                closeModal(event,
                    signUpModalOverlay,
                     logInButton,
                      errorMessage,
                       errorMessageVisibleClassName,
                        modalOverlayVisibleClassName,
                         usernameInput,
                          emailInput,
                          passwordInput,
                           confirmPasswordInput);
            } else {
                console.log('user already exists');
                errorMessage.classList.add('sign-up-modal__error-message--visible');
            }
        } else {
            console.log('wrong data for user creation')
        }
});

userProfileButtonUnsigned.addEventListener('click', () => {
    if(localStorage.getItem('isLogedIn') === 'false') {
        showModal(signUpModalOverlay, modalOverlayVisibleClassName);
    }
    
});

signUpModalOverlay.addEventListener('click', (event) => {
    closeModal(event,
         signUpModalOverlay,
          logInButton,
           errorMessage,
            errorMessageVisibleClassName,
             modalOverlayVisibleClassName,
              usernameInput,
               emailInput,
               passwordInput,
                confirmPasswordInput);
});

createTicketButton.addEventListener('click', () => {
    console.log(localStorage.getItem('isLogedIn'))
    if (localStorage.getItem('isLogedIn') === 'false') {
        showModal(signUpModalOverlay, modalOverlayVisibleClassName);
    }
});

emailInput.addEventListener('blur', () => emailInputValidation(emailInput));

usernameInput.addEventListener('blur', () => usernameInputValidation(usernameInput));

emailInput.addEventListener('focus', () => inputValidState(emailInput));

usernameInput.addEventListener('focus', () => inputValidState(usernameInput));

passwordInput.addEventListener('focus', () => inputValidState(passwordInput));

confirmPasswordInput.addEventListener('focus', () => inputValidState(confirmPasswordInput));

logInButton.addEventListener('click', (event) => {
    showModal(logInModalOverlay, "log-in-modal-overlay--visible");
    closeModal(event,
        signUpModalOverlay,
         logInButton,
          errorMessage,
           errorMessageVisibleClassName,
            modalOverlayVisibleClassName,
             usernameInput,
              emailInput,
              passwordInput,
               confirmPasswordInput);
})

