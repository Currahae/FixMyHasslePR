const issuesList = document.querySelector(".latest-tickets__list");

async function renderAllPosts() {
    const postsResponse = await fetch('/posts');
    const allPosts = await postsResponse.json();

    let postsHTML = '';

    allPosts.forEach(post => {
        postsHTML += `
                <a href="post.html?id=${post.id}&title=${post['title']}" class="latest-tickets__item-link">
                    <div class="latest-tickets__item post-id="${post['id']}">
                        <div class="latest-tickets__item-title">${post['title']}</div>
                        <div class="latest-tickets__item-status"><span class="latest-tickets__item-status-span">${post['status']}</span></div>
                        <div class="latest-tickets__item-asker">${post['author_name']}</div>
                        <div class="latest-tickets__item-created-at">${new Date(post['created_at']).toLocaleString()}</div>
                    </div>
                </a>`
    });

    issuesList.innerHTML += postsHTML;
    
}

renderAllPosts();