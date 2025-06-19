import {
    inputInvalidState,
    inputValidState,
    clearAllInputs,
    showModal,
    closeCreateTicketModal
} from './modalUtils.js'

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

createTicketHeaderButton.addEventListener('click', () => {
    showModal(createTicketModalOverlay, createTicketModalVisibleClass);
});

createTicketModalOverlay.addEventListener('click', (e) => {
    closeCreateTicketModal(e, createTicketModalOverlay, titleInput, quill)
})

titleInput.addEventListener('blur', ()=> inputInvalidState(titleInput));

descriptionInput.addEventListener('click', () => {
    console.log(quill.root.innerHTML)
});