const signUpModalHTML = `<div class="sign-up-modal-overlay">
        <div class="sign-up-modal">
            <div class="sign-up-modal__title">Create an account</div>
            <div class="sign-up-modal__inputs-container">
                <div class="sign-up-modal__inputs-container-input-wrapper">
                    <span class="sign-up-modal__input_title">Username</span>
                    <input class="sign-up-modal__input" type="text" name="sign_up_name" id="sign_up_name" placeholder="Enter username">
                </div>
                <div class="sign-up-modal__inputs-container-input-wrapper">
                    <span class="sign-up-modal__input_title">Email</span>
                    <input class="sign-up-modal__input" type="email" name="sign_up_email" id="sign_up_email" placeholder="Enter your email">
                </div>
                <div class="sign-up-modal__inputs-container-input-wrapper">
                    <span class="sign-up-modal__input_title">Password</span>
                    <input class="sign-up-modal__input" type="password" name="sign_up_pass" id="sign_up_pass" placeholder="Enter your password">
                </div>
                <div class="sign-up-modal__inputs-container-input-wrapper">
                    <span class="sign-up-modal__input_title">Confirm Password</span>
                    <input class="sign-up-modal__input" type="password" name="sign_up_conf_pass" id="sign_up_conf_pass" placeholder="Confirm your password">
                </div>
                <input class="sign-up-modal__button" type="button" value="Sign Up">
            </div>
            <div class="sign-up-modal__error-message">Username or email already exists</div>
            <div class="sign-up-modal__log-in-redirect">Already have an account? <a class="sign-up-modal__log-in-redirect-link">Log in</a></div>
        </div>
    </div>`;


const logInModalHTML = `<div class="log-in-modal-overlay">
    <div class="log-in-modal">
        <div class="log-in-modal__title">Log in to your account</div>
        <div class="log-in-modal__inputs-container">
            <div class="log-in-modal__inputs-container-input-wrapper">
                <span class="log-in-modal__input_title">Username</span>
                <input class="log-in-modal__input" type="text" name="log_in_name" id="log_in_name" placeholder="Enter username">
            </div>
            <div class="log-in-modal__inputs-container-input-wrapper">
                <span class="log-in-modal__input_title">Email</span>
                <input class="log-in-modal__input" type="email" name="log_in_email" id="log_in_email" placeholder="Enter your email">
            </div>
            <div class="log-in-modal__inputs-container-input-wrapper">
                <span class="log-in-modal__input_title">Password</span>
                <input class="log-in-modal__input" type="password" name="log_in_pass" id="log_in_pass" placeholder="Enter your password">
            </div>
            <input class="log-in-modal__button" type="button" value="Log In">
        </div>
        <div class="log-in-modal__error-message">Username or email does not exists</div>
        <div class="log-in-modal__log-in-redirect">Don't have an account? <a class="log-in-modal__log-in-redirect-link">Sign up</a></div>
    </div>
</div>`;

const createTicketModal = `<div class="create-ticket-modal-overlay">
    <div class="create-ticket-modal">
        <div class="create-ticket-modal__title">Create Ticket</div>
        <div class="create-ticket-modal__inputs-container">
            <div class="create-ticket-modal__inputs-container-input-wrapper">
                <span class="create-ticket-modal__input_title">Issue Title</span>
                <input class="create-ticket-modal__input" type="text" name="issue_title" id="issue_title" placeholder="Enter issue title">
            </div>
            <div class="create-ticket-modal__inputs-container-input-wrapper">
                <span class="create-ticket-modal__input_title">Description</span>
                <div id="quill-editor" style="height: 200px;"></div>
            </div>
            <input class="create-ticket-modal__button" type="button" value="Create" style="width: 150px;">
        </div>
    </div>
</div>`;



if (localStorage.getItem('isLogedIn') === 'false') {
    document.body.insertAdjacentHTML('beforeend', logInModalHTML);
    document.body.insertAdjacentHTML('beforeend', signUpModalHTML);
}

if (localStorage.getItem('isLogedIn') === 'true') {
    document.body.insertAdjacentHTML('beforeend', createTicketModal);
}