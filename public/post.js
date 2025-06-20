import { getCurrentUser } from "./authServise.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const tabTitle = params.get('title');

document.title = `FixMyHassle - ${tabTitle}`;

const issueTitle = document.querySelector(".post-title");
const issueAuthor = document.querySelector(".post-author");
const issueDate = document.querySelector(".post-date");
const issueContent = document.querySelector(".post-content");

const deleteTicketButton = document.querySelector(".post__delete-ticket-button");

async function loadPost() {
    const postResponse = await fetch(`/posts/${postId}`);
    const postData = await postResponse.json();

    if(getCurrentUser() && (postData.user_id === getCurrentUser().id)){
        deleteTicketButton.classList.add("post__delete-ticket-button--visible")
    }

    issueTitle.textContent = postData.title;
    issueAuthor.textContent = postData.author_name;
    issueDate.textContent = new Date(postData.created_at).toLocaleString();
    issueContent.innerHTML = postData.content;
}

async function deletePost() {
    await fetch('/posts/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postID: postId
        })
    });

    window.location.href = '/index.html';
}

loadPost();

deleteTicketButton.addEventListener('click', () => {
    deletePost();
})