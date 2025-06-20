import { restoreUser, getCurrentUser, clearCurrentUser } from "./authServise.js";

if (!localStorage.getItem('isLogedIn')) {
    localStorage.setItem('isLogedIn', 'false')
}

async function getTopSolvers() {
    const response = await fetch('/users');
    const users = await response.json();
    const usersSortedByPosts = users.sort((userA, userB) => userB['count_of_posts'] - userA['count_of_posts']);
    return usersSortedByPosts
    
}

const topSolversList = document.querySelector('.top-solvers__list');

const userProfileButton = document.querySelector('.navbar__user-profile');
const userProfileDropdown = document.querySelector(".navbar__user-profile-dropdown");

const logOutButton = document.querySelector('#log_out_button');

if (topSolversList) {
    getTopSolvers().then(users => {
        console.log(users);
        for (let i = 0; i < 5; i++) {
            topSolversList.innerHTML += `<div class="top-solvers__item">
                            <div class="top-solvers__item-image-container">
                                <div class="top-solvers__item-image">
                                    <img src="${users[i].avatar}" alt="Default avatar">
                                </div>
                            </div>
                            <div class="top-solvers__item-user-container">
                                <div class="top-solvers__item-name">${users[i].username}</div>
                                <div class="top-solvers__item-rating">${users[i].count_of_posts}  tickets solved</div>
                            </div>
                        </div>`
        }
    })
}

userProfileButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (localStorage.getItem('isLogedIn') === 'true') {
        userProfileDropdown.classList.toggle('navbar__user-profile-dropdown--open');
    }
})


document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar__user-profile-dropdown') && !e.target.closest('.navbar__user-profile')) {
      if (userProfileDropdown.classList.contains('navbar__user-profile-dropdown--open')) {
        userProfileDropdown.classList.remove('navbar__user-profile-dropdown--open');
      }
    }
});

logOutButton.addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.setItem('isLogedIn', 'false');
    clearCurrentUser();
    userProfileDropdown.classList.remove('navbar__user-profile-dropdown--open');
    location.reload();
});

restoreUser();
const user = getCurrentUser();
console.log(user);

