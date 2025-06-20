import {
    inputInvalidState,
    inputValidState,
    clearAllInputs,
    showModal,
    closeCreateTicketModal,
    isValidIssueTitle,
	titleInputValidation
} from './modalUtils.js'

import { getCurrentUser } from './authServise.js';

const issuesList = document.querySelector(".latest-tickets__list");

const createTicketHeaderButton = document.querySelector(".navbar__create-ticket-button");

const createTicketModalOverlay = document.querySelector(".create-ticket-modal-overlay");
const createTicketModalVisibleClass = "create-ticket-modal-overlay--visible";

const titleInput = document.querySelector("#issue_title");
let descriptionInput;
const createButton = document.querySelector('.create-ticket-modal__button');

let quill;

if (createTicketModalOverlay) {
    quill = new Quill('#quill-editor', {
        theme: 'snow',
        placeholder: 'Describe your issue here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['image']
          ]
        }
      });

      descriptionInput = document.querySelector(".ql-container");
}

async function createPost() {
	const currentUser = getCurrentUser();
	const creationResponse = await fetch('/posts', {
    	method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userID: currentUser.id,
			username: currentUser.username,
            issueTitle: titleInput.value.trim(),
            issueDescription: quill.root.innerHTML,
			creationDate: new Date().toISOString()
        })
  	});

	console.log(creationResponse.status, creationResponse.statusText);
	const postData = await creationResponse.json();
	console.table(postData);

	location.reload();

	// issuesList.innerHTML += `
	// 			<a href="post.html?id=${postData.id}&title=${postData['title']}" class="latest-tickets__item-link">
	// 				<div class="latest-tickets__item" post-id="${postData['id']}">
    //                     <div class="latest-tickets__item-title">${postData['title']}</div>
    //                     <div class="latest-tickets__item-status"><span class="latest-tickets__item-status-span">${postData['status']}</span></div>
    //                     <div class="latest-tickets__item-asker">${postData['author_name']}</div>
    //                     <div class="latest-tickets__item-created-at">${new Date(postData['created_at']).toLocaleString()}</div>
    //                 </div>
	// 			</a>`
}

createTicketHeaderButton.addEventListener('click', () => {
  	showModal(createTicketModalOverlay, createTicketModalVisibleClass);
});

createTicketModalOverlay.addEventListener('click', (e) => {
  	closeCreateTicketModal(e, createTicketModalOverlay, titleInput, quill, createButton);
});

titleInput.addEventListener('blur', () => titleInputValidation(titleInput));

titleInput.addEventListener('focus', () => inputValidState(titleInput));

createButton.addEventListener('click', async (e) => {
	if (isValidIssueTitle(titleInput.value)) {
		createPost();
		closeCreateTicketModal(e, createTicketModalOverlay, titleInput, quill, createButton);
	} else {
		inputInvalidState(titleInput);
	}
})

