/****** MODAL ******/
const title = document.querySelector('.title');
const closeBtn = document.querySelector('.closeBtn');
const modalWrapper = document.querySelector('.modal-wrapper');
const descrShort = document.querySelector('.descrShort');
const descrLong = document.querySelector('.descrLong');
const creator = document.querySelector('.creator');
const dateStart = document.querySelector('.dateStart');
const dateEnd = document.querySelector('.dateEnd');
const assigned = document.querySelector('.assigned-list');
const weight = document.querySelector('.weight');
const startBtn = document.querySelector('.start-task-btn');

window.addEventListener('keydown', e => {
  console.log(e);
  if (e.key === 'Escape') {
    modalWrapper.style.display = 'none';
  }
});

closeBtn.addEventListener('click', e => {
  modalWrapper.style.display = 'none';
});

startBtn.addEventListener('click', async e => {
  // request do bazy danych - update bazy
  const id = modalWrapper.dataset.id;
  console.log(id);
  const response = await fetch(`http://127.0.0.1:3000/api/tasks/start/${id}`);
  console.log(response);
  // zmiana napisu na
});

const tasksListContainer = document.querySelector('.tasks-container');

/****** RENDER TASK MODULE ******/
const renderTask = tasks => {
  const elementsArr = tasks.map(task => {
    const status = task.status ? 'W trakcie' : 'Nie podjęte';
    const statusColor = task.status ? '#4caf50' : '#f50303';
    return `
      <div class="task-module" data-id=${task._id}>
        <span style="background:${statusColor};" class="task-status">${status}</span>
        <span class="task-description">${task.descrShort}</span>
      </div>
    `;
  });

  return elementsArr.join('');
};

/****** FETCHING DATA ******/
let documents;
const request = fetch('http://127.0.0.1:3000/api/tasks', {
  method: 'GET'
});

request
  .then(tasks => tasks.json())
  .then(tasks => {
    console.log(tasks);
    documents = tasks;
    tasksListContainer.innerHTML = renderTask(tasks);
  })
  .catch(err => {
    console.log(err);
  });

/****** EVENT LISTENERS ******/

tasksListContainer.addEventListener('click', e => {
  const id = e.target.parentElement.dataset.id;

  // Zapisuje id dokumentu na wrapperz'e okna modalnego
  modalWrapper.dataset.id = id;

  const document = documents.find(document => {
    return document._id === id;
  });
  console.log(document);
  const startDate = new Date(document.dateStart);
  const endDate = document.dateEnd
    ? new Date(document.dateEnd)
    : 'nieokreślone';

  const descrLongRender = document.descrLong
    ? `${document.descrLong}`
    : 'Brak opisu zadania';

  const assignedRender =
    document.assigned.length !== 0
      ? document.assigned
          .map(person => {
            return `
        <li>${person}</li>
      `;
          })
          .join('')
      : 'Brak';

  // Gives values into a modal window
  descrShort.textContent = document.descrShort;
  creator.textContent = `${document.creator}`;
  dateStart.textContent = `${startDate.getDate() + 1}.${startDate.getMonth() +
    1}.${startDate.getFullYear()}`;
  assigned.innerHTML = assignedRender;
  dateEnd.textContent =
    endDate !== 'nieokreślone'
      ? `${endDate.getDate() + 1}.${endDate.getMonth() +
          1}.${endDate.getFullYear()}`
      : `${endDate}`;
  descrLong.innerHTML = descrLongRender;
  weight.textContent = document.weight;

  // Makes modal window visible
  modalWrapper.style.display = 'block';
});
