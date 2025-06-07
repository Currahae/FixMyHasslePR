export async function userExistsValidation(usernameInput, emailInput) {
    const response = await fetch('/users');
    const users = await response.json();
    const userExists = users.some(user => user.username === usernameInput.value.trim() ||
                                         user.email === emailInput.value.trim());
    if (userExists) {
        return true;
    } else {
        return false;
    }
    
}