"use strict";

// =================== Глобальные переменные =================== //

// modal
const modal = document.querySelector('.modal');
const modalTopIcon = document.querySelector('.modal-top__icon');
const inputSelect = document.querySelector('.input-select');
const inputDescr = document.querySelector('#input-descr');
const inputExp = document.querySelector('#input-exp');
const modalExit = document.querySelector('.modal-top__info--arrowLeft');
const btnAddTask = document.querySelector('.btn-form__modal');

// header
const headerBurger = document.querySelector('.header-left__burger');
const headerDate = document.querySelector('.header-left__date');
const numberOfTasks = document.querySelector('.header-right__tasks--left');
const tasksLocated = document.querySelector('.tasks-located');

// main content
const contentList = document.querySelector('.content-list');
const taskName = document.querySelector('.content-item__task--title');
const taskDescr = document.querySelector('.content-item__task--subtitle');

// content-completed
const btnAdd = document.querySelector('.btn-add');
const btnDone = document.querySelectorAll('.btn-done');
const btnDelete = document.querySelectorAll('.btn-delete');

// =================== Функции приложения =================== //

// Функция отображения даты
const date = new Date();
headerDate.innerHTML = date.toDateString();

// Функции открытия и закрытия модального окна 
const openModal = () => {
   modal.classList.toggle('show');
}

const closeModal = () => {
   modal.classList.remove('show');
}

// Функция отображения в модальном окне значка выбранного таска
const displayTask = () => {
   let task = inputSelect.value;
   modalTopIcon.innerHTML = task;
}

// Функция добавления таска
const addNewTask = (e) => {
   e.preventDefault();

   let newTask = document.createElement('li');
   newTask.classList.add('content-item');
   newTask.setAttribute('data-attr', 'task');
   newTask.innerHTML = `
      <div class="content-item__left">
         <div class="content-item__icon">
            ${inputSelect.value}
         </div>
         <div class="content-item__task">
            <div class="content-item__task--title">
               ${inputDescr.value} 
            </div>
            <div class="content-item__task--subtitle">
               ${inputExp.value} 
            </div>
         </div>
      </div>
      <div class="content-item__right">
         <div class="content-item__buttons">
            <button class="btn-done" >
               <svg data-action="done"
               xmlns = "http://www.w3.org/2000/svg"
               width="26" 
               height="26" 
               fill="currentColor"
               class="bi bi-check2" 
               viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
               </svg>
            </button>
            <button class="btn-delete">
               <svg 
               data-action="delete"
               xmlns="http://www.w3.org/2000/svg" 
               width="26" 
               height="26" 
               fill="currentColor"
               class="bi bi-x" 
               viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
               </svg>
            </button>
         </div>
      </div>
   `;

   contentList.append(newTask);
   inputDescr.value = '';
   inputExp.value = '';

   updateCount();
   closeModal();

   tasksLocated.classList.add('delete');
};

// Функция отмечания таска сделанным
contentList.addEventListener('click', function taskDoneFunction(e) {
   e.preventDefault();
   if (e.target.getAttribute('data-action') == 'done') {
      e.target.closest('.content-item')
         .querySelector('.content-item__task')
         .classList.toggle('done');
   }
});

// Функция удаления таска
contentList.addEventListener('click', function taskDeleteFunction(e) {
   e.preventDefault();
   if (e.target.getAttribute('data-action') == 'delete')
      e.target.closest('li').remove();
   updateCount();

});

// Функция отображения созданных тасков
const updateCount = () => {
   let count = document.querySelectorAll('.content-item').length;
   numberOfTasks.innerHTML = count;
}


// =================== Прослушиватели событий =================== //

btnAdd.addEventListener('click', openModal);
modalExit.addEventListener('click', closeModal);
inputSelect.addEventListener('change', displayTask);
btnAddTask.addEventListener('click', addNewTask);
