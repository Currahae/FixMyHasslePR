export async function userExistsValidation(usernameInput, emailInput) {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();

    const response = await fetch(`/users/existsSign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
    });

    const result = await response.json();
    return result.exists;
}

export async function userLogIn(usernameInput, emailInput, passwordInput) {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const response = await fetch('/users/LogIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username,
            email: email,
            password: password})
    });

    const result = await response.json();
    return result.answer;
    
}