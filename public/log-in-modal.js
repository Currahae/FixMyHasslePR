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

import { User } from './User.js'

import { saveUser } from './authServise.js';

import { userLogIn } from './userService.js'

const logInModalOverlay = document.querySelector('.log-in-modal-overlay');
const logInButton = document.querySelector('.log-in-modal__button');

const usernameInput = document.querySelector('#log_in_name');
const emailInput = document.querySelector('#log_in_email');
const passwordInput = document.querySelector('#log_in_pass');
const errorMessage = document.querySelector('.log-in-modal__error-message');

const signUpButton = document.querySelector('.log-in-modal__log-in-redirect-link');
const signUpModalOverlay = document.querySelector('.sign-up-modal-overlay');

const errorMessageVisibleClassName = 'log-in-modal__error-message--visible';
const modalOverlayVisibleClassName = 'log-in-modal-overlay--visible';

logInModalOverlay.addEventListener('click', (event) => {
    closeModal(event,
        logInModalOverlay,
        signUpButton,
        errorMessage,
            errorMessageVisibleClassName,
             modalOverlayVisibleClassName,
              usernameInput,
               emailInput,
               passwordInput);
});

signUpButton.addEventListener('click', (event) => {
    showModal(signUpModalOverlay, "sign-up-modal-overlay--visible");
    closeModal(event,
        logInModalOverlay,
        signUpButton,
        errorMessage,
            errorMessageVisibleClassName,
             modalOverlayVisibleClassName,
              usernameInput,
               emailInput,
               passwordInput);
});

emailInput.addEventListener('blur', () => emailInputValidation(emailInput));

usernameInput.addEventListener('blur', () => usernameInputValidation(usernameInput));

emailInput.addEventListener('focus', () => inputValidState(emailInput));

usernameInput.addEventListener('focus', () => inputValidState(usernameInput));

passwordInput.addEventListener('focus', () => inputValidState(passwordInput));

logInButton.addEventListener('click', async (event) => {
    const isEmailValid = emailInputValidation(emailInput);
    const isUsernameValid = usernameInputValidation(usernameInput);

    if (isEmailValid
        && isUsernameValid) {
            const logInAnswer = await userLogIn(usernameInput, emailInput, passwordInput);
            if (logInAnswer.answer === 'user_accessed') {
                localStorage.setItem('isLogedIn', 'true');
                const user = new User(logInAnswer.id, logInAnswer.username, logInAnswer.email, logInAnswer.avatar, logInAnswer.countOfPosts);
                console.log('success login');
                saveUser(user);
                closeModal(event,
                    logInModalOverlay,
                     logInButton,
                      errorMessage,
                       errorMessageVisibleClassName,
                        modalOverlayVisibleClassName,
                         usernameInput,
                          emailInput,
                          passwordInput);
            } else if (logInAnswer.answer === 'user_dont_exist') {
                errorMessage.textContent = "Username or email does not exists";
                errorMessage.classList.add(errorMessageVisibleClassName);
                errorMessage.classList.add("shake");
                setTimeout(()=>{errorMessage.classList.remove("shake");}, 300);
            } else if (logInAnswer.answer === 'wrong_password') {
                errorMessage.textContent = "Password incorrect";
                errorMessage.classList.add(errorMessageVisibleClassName);
                errorMessage.classList.add("shake");
                setTimeout(()=>{errorMessage.classList.remove("shake");}, 300);
            }
        } else {
            console.log('wrong data for user log in')
        }
});
