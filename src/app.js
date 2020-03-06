import { isValid, modalWindow } from './utils';
import {Task} from "./task";
import { getAuthForm, authWithEmailAndPassword } from './auth';
import './style.css';

const form = document.querySelector("#form");
const input = form.querySelector("#quest");
const button = form.querySelector("#submit");
const modalBtn = document.querySelector("#modalBtn");

window.addEventListener('load', Task.renderList);

form.addEventListener("submit", submintFormHandler);

input.addEventListener('input', ()=>{
    button.disabled = !isValid(input.value);
})


modalBtn.addEventListener("click",openModalWindow);


function submintFormHandler(event){
    event.preventDefault()
    if(isValid(input.value)){
        const task = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        Task.create(task)
        .then(()=>{
            input.value = '';
            input.classList='';
            button.disabled=false;
        })
     }
}


//{once:true} добавить событие один раз

function openModalWindow(){
    modalWindow('авторизация', getAuthForm())
    document.querySelector('#auth_form').addEventListener('submit', authFormHendler)
}

function authFormHendler (event) {
    event.preventDefault();

    const email =  event.target.querySelector('#emailInput').value;
    const password =  event.target.querySelector('#passwordInput').value;
    const btn =  event.target.querySelector('#authBtn');
    btn.disabled = true;

    authWithEmailAndPassword(email , password)
    .then(Task.getAllTask)
    .then(renderModalAfterAuth)
    .then(()=>{btn.disabled = false});

}

function renderModalAfterAuth(content){
    if(typeof content === "string"){
        modalWindow("Ошибка", content)
    } else {
        modalWindow("Список Задач", Task.taskToHTML(content))
    }
}