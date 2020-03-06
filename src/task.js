export class Task{
    static create(task){
        return fetch('https://jsform-1b415.firebaseio.com/task.json',{
            method:'POST',
            body: JSON.stringify(task),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response=>{
            return response.json()})
        .then(response=>{
            task.id = response.name;
            return task;
        })
        .then(addToLocationStorage)
        .then(Task.renderList)
    } 
    static renderList(){
        const tasks = getTaskFromLocalStorage();

        const html = tasks.length ? 
        tasks.map(toCard).join(''):`<div class="mui--text-headline">Задач Нет</div>`;

        const list = document.querySelector('#list');
        list.innerHTML =  html;  
    }

    static getAllTask(token){
        if(!token){
            return Promise.resolve('<p class="error">Вы не авторизированны</p>')
        }
        return fetch(`https://jsform-1b415.firebaseio.com/task.json?auth=${token}`)
                .then(response=>response.json())
                .then(response=>{
                    if(response && response.error) return `<p class="error">${response.error}</p>`;
                    return response ? Object.keys(response).map(key=>({
                            ...response[key],
                            id:key
                    })
                     ):[];

                   
                })
    }
    static taskToHTML(tasks){
        return tasks.length > 0 ? `<ol>${tasks.map(t=>{
            return `<li>${t.text}</li>`

        })} </ol>`:
        'Список Пуст задач';
    }

}
  //передаем токен параметром для провреки в бд или пользователь авторизован для чтения данных ".read": "auth!=null",

function addToLocationStorage (task){
    const allTask = getTaskFromLocalStorage();
    allTask.push(task);
    localStorage.setItem('task', JSON.stringify(allTask));
}

function getTaskFromLocalStorage (){
    return Array.from(JSON.parse(localStorage.getItem('task') || '[]'));
}


function toCard (task){
    return `
    <div class="mui--text-black-54">${new Date(task.date).toLocaleDateString()} ${new Date(task.date).toLocaleTimeString()} </div>
    <div>${task.text}</div>
   `
}

