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

