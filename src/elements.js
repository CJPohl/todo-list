import './style.css';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const toDoEls = (() => {
    const initPage = () => {
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('main-container');
        document.body.appendChild(mainContainer);

        const header = createHeader();
        const footer = createFooter();
        
        mainContainer.appendChild(header);
        mainContainer.appendChild(footer);

    }

    const createHeader = () => {
        const header = document.createElement('div');
        header.classList.add('header');

        const homeIcon = document.createElement('a');
        homeIcon.innerHTML = '<i class="fas fa-home"></i>';

        const headerTitle = document.createElement('h1');
        headerTitle.classList.add('header-title');
        headerTitle.innerHTML = 'What do you have planned for today?';

        const addIcon = document.createElement('a');
        addIcon.innerHTML = '<i class="fas fa-plus"></i>';

        header.appendChild(homeIcon);
        header.appendChild(headerTitle);
        header.appendChild(addIcon);


        return header;
    }

    const createFooter = () => {
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
        initPage
    };
})();

export {toDoEls};