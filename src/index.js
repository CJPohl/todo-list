// TODO:
// - The todo text objects created by function factories
// - Todo objects need to have attributes such as title, description, dates, priorities, checklist, etc.
// - Function factory for project folders which are parents to individual todo objects
// - Create new projects / delete projects
// - Sepearate app logic vs DOM logic
// - Clean UI (View all projects, view idividual todos, color code priorities, expand individual todo, delete todo)
// - localStorage

import './style.css';

const todoLists = (() => {
    // project factory
    const Project = (title, category) => {
        const emptyProject = [];
        let currentProject = [];
        const getTitle = () => title;
        const getCategory = () => category;
    }

    // todo factory
    const TODO = (title, des, dueDate, priority, checkStatus) => {
        const getTitle = () => title;
        const getDes = () => des;
        const getDueDate = () => dueDate;
        const getPriority = () => priority;
        const getCheckStatus = () => checkStatus;
    }
})();

const todoEls = (() => {
    const initPage = () => {
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('main-container');
        document.body.appendChild(mainContainer);
    }
   
    
    window.onload = () => {
        initPage();
    }
})();