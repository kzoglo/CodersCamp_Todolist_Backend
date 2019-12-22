const title = document.querySelector('.title');
const closeBtn = document.querySelector('.closeBtn');
const modalWrapper = document.querySelector('.modal-wrapper');

title.addEventListener('click', e => {
  modalWrapper.style.display = 'block';
});

closeBtn.addEventListener('click', e => {
  modalWrapper.style.display = 'none';
});
