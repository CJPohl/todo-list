// TODO:
// - The todo text objects created by function factories
// - Todo objects need to have attributes such as title, description, dates, priorities, checklist, etc.
// - Function factory for project folders which are parents to individual todo objects
// - Create new projects / delete projects
// - Sepearate app logic vs DOM logic
// - Clean UI (View all projects, view idividual todos, color code priorities, expand individual todo, delete todo)
// - localStorage

import { toDoEls } from "./elements";
import { objects, toDoLists } from "./objects";

//const emptyProjectsArray = [];
let projectsArray = [];
const emptyProject = [];

const randomProject1 = objects.Project('Coding', 'Work');
const randomProject2 = objects.Project('Lego', 'Fun');

const todo1 = objects.TODO('Feed the Cats', 'Give the cats food', 'Tomorrow', false, false );
const todo2 = objects.TODO('Feed the Cats', 'Give the cats food', 'Tomorrow', false, false );

projectsArray.push(randomProject1);
projectsArray.push(randomProject2);

randomProject1.currentProject.push(todo1);
randomProject1.currentProject.push(todo2);



const scripts = (() => {
    // for all projects in project array, render to screen
    const renderProjects = () => {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = '';

        for (let i=0; i<projectsArray.length; i++) {
            const project = document.createElement('div');
            project.classList.add('project');
            project.innerHTML = `<p>${projectsArray[i].getTitle()}</p>`;

            projectContainer.appendChild(project);
        }
    }

    const renderToDos = () => {
        const toDoContainer = document.querySelector('.todo-container');
        toDoContainer.innerHTML = '';

        for (let i=0; i<randomProject1.currentProject.length; i++) {
            let checkStatus;
            let priorityStatus;

            const todo = document.createElement('div');
            todo.classList.add('todo');
            
            if (randomProject1.currentProject[i].getCheckStatus() === false) {
                checkStatus = "far fa-circle";
            }
            else {
                checkStatus = "fas fa-circle";
            }
            
            if (randomProject1.currentProject[i].getPriority() === false) {
                priorityStatus = "fas fa-bell-slash";
            }
            else {
                priorityStatus = "fas fa-bell";
            }
            
            todo.innerHTML = `
            <div class="todo-left">
                <div><i class="${checkStatus}"></i></div>
                <p class="todo-main-text">${randomProject1.currentProject[i].getTitle()}</p>
                <p class="todo-faded-text">${randomProject1.currentProject[i].getDueDate()}</p>
                <p class="todo-main-text">${randomProject1.currentProject[i].getDes()}</p>
                <div><i class="${priorityStatus}"></i></div>
            </div>
            <div class="todo-right">
            <div><i class="fas fa-times"></i></div>
            </div>
            `;

            toDoContainer.appendChild(todo);
        }
    }

    return {
        renderProjects,
        renderToDos,
    }

    
})();


window.onload = () => {
    toDoEls.initPage();
    scripts.renderProjects();
    scripts.renderToDos();
}
