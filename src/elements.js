import './style.css';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import { scripts } from './script';

const staticEls = (() => {
    // Static content
    const initPage = () => {
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('main-container');
        document.body.appendChild(mainContainer);

        const header = createHeader();
        const contentContainer = createContent();
        const footer = createFooter();
        
        mainContainer.appendChild(header);
        mainContainer.appendChild(contentContainer);
        mainContainer.appendChild(footer);
    }

    const createHeader = () => {
        // app header
        const header = document.createElement('div');
        header.classList.add('header');

        const homeIcon = document.createElement('a');
        homeIcon.classList.add('header-left');
        homeIcon.innerHTML = '<i class="fas fa-home"></i>';

        const headerTitle = document.createElement('h1');
        headerTitle.classList.add('header-title');
        headerTitle.innerHTML = 'Todo List';

        const headerRight = document.createElement('div');
        headerRight.classList.add('header-right');
        
        const addIcon = document.createElement('a');
        addIcon.innerHTML = '<i class="fas fa-plus"></i>';
        headerRight.appendChild(addIcon);

        homeIcon.addEventListener('click', scripts.returnDefault);

        addIcon.addEventListener('click', () => {
            if ((document.querySelector('.dropdown') === null ) && (document.querySelector('.edit-box') === null) && (document.querySelector('.new-todo') === null) && (document.querySelector('.new-project') === null)) {
                scripts.addDropDown();
            }
        });

        header.appendChild(homeIcon);
        header.appendChild(headerTitle);
        header.appendChild(headerRight);


        return header;
    }

    // create app content
    const createContent = () => {
        // container to hold app content
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        // project columns
        const projectColumn = document.createElement('div');
        projectColumn.classList.add('project-column');

        const projectColumnTitle = document.createElement('div');
        projectColumnTitle.classList.add('column-title');
        projectColumnTitle.innerHTML = '<h2>Projects</h2>';

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        projectColumn.appendChild(projectColumnTitle);
        projectColumn.appendChild(projectContainer);

        // to do items
        const toDoColumn = document.createElement('div');
        toDoColumn.classList.add('todo-column');

        const toDoTitle = document.createElement('div');
        toDoTitle.classList.add('column-title');
        toDoTitle.innerHTML = '<h2 id="todo-column-title">Todo</h2>';

        const toDoContainer = document.createElement('div');
        toDoContainer.classList.add('todo-container');

        toDoColumn.appendChild(toDoTitle);
        toDoColumn.appendChild(toDoContainer);

        contentContainer.appendChild(projectColumn);
        contentContainer.appendChild(toDoColumn);

        return contentContainer;
    }

    const createFooter = () => {
        // app footer
        const footer = document.createElement('div');
        footer.classList.add('footer');

        const copyright = document.createElement('p');
        copyright.innerHTML = 'Copyright @ 2021 Christopher J. Pohl';

        const githubIcon = document.createElement('a');
        githubIcon.setAttribute('href', 'https://github.com/CJPohl');
        githubIcon.innerHTML = '<i class="fab fa-github"></i>';


        footer.appendChild(copyright);
        footer.appendChild(githubIcon);

        return footer;
    }
    return {
        initPage,
    };
})();

export {staticEls};