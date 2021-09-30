const objects = (() => {
    // project factory
    const Project = (title, category) => {
        const getTitle = () => title;
        const currentProject = []
        return {
            getTitle,
            currentProject
        }
    }

    // todo factory
    const TODO = (title, des, dueDate, priority, checkStatus) => {
        const getTitle = () => title;
        const getDes = () => des;
        const getDueDate = () => dueDate;
        const getPriority = () => priority;
        const getCheckStatus = () => checkStatus;

        return {
            getTitle,
            getDes,
            getDueDate,
            getPriority,
            getCheckStatus
        }
    }

    return {
        Project,
        TODO
    }
})();

const scripts = (() => {
    let projectsArray = [];
    
    const emptyProject = [];

   

    const randomProject1 = objects.Project('Coding', 'Work');
    const randomProject2 = objects.Project('Lego', 'Fun');

    const todo1 = objects.TODO('Feed the Cats', 'Give the cats food', 'Tomorrow', false, false );
    const todo2 = objects.TODO('Feed asdfthe Cats', 'Give thasdfe cats food', 'Tomorrow', false, false );

    projectsArray.push(randomProject1);
    projectsArray.push(randomProject2);

    randomProject1.currentProject.push(todo1);
    randomProject1.currentProject.push(todo2);

    const DEFAULT_PROJECT = projectsArray[0];
    let projectChoice = DEFAULT_PROJECT;


    // for all projects in project array, render to screen
    const renderProjects = () => {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = '';

        for (let i=0; i<projectsArray.length; i++) {
            const project = document.createElement('div');
            project.classList.add('project');
            project.setAttribute('id', `${i}`);
            project.innerHTML = `
            <div class="project-left">
                <p>${projectsArray[i].getTitle()}</p>
            </div>
            <div class="project-right">
                <div><a name="delete-project"><i class="fas fa-times"></i></a></div>
            </div>
            `;

            projectContainer.appendChild(project);

            project.addEventListener('click', _chooseProject);
            
            const deleteProjects = document.getElementsByName('delete-project');
            deleteProjects.forEach(del => del.addEventListener('click', _deleteProject));
        }
        
    }

    const renderToDos = () => {
        const toDoContainer = document.querySelector('.todo-container');
        toDoContainer.innerHTML = '';
        let chosenProject = _isDefaultProject();
       
        for (let i=0; i<chosenProject.currentProject.length; i++) {
            let checkStatus;
            let priorityStatus;

            const todo = document.createElement('div');
            todo.classList.add('todo');
            todo.setAttribute('id', `${i}`);
            
            if (chosenProject.currentProject[i].getCheckStatus() === false) {
                checkStatus = "far fa-circle";
            }
            else {
                checkStatus = "fas fa-circle";
            }
            
            if (chosenProject.currentProject[i].getPriority() === false) {
                priorityStatus = "fas fa-bell-slash";
            }
            else {
                priorityStatus = "fas fa-bell";
            }
            
            todo.innerHTML = `
            <div class="todo-left">
                <div><i class="${checkStatus}"></i></div>
                <p class="todo-main-text">${chosenProject.currentProject[i].getTitle()}</p>
                <p class="todo-faded-text">${chosenProject.currentProject[i].getDueDate()}</p>
                <p class="todo-main-text">${chosenProject.currentProject[i].getDes()}</p>
                <div><i class="${priorityStatus}"></i></div>
            </div>
            <div class="todo-right">
            <div><a name="delete-todo"><i class="fas fa-times"></i></a></div>
            </div>
            `;

            toDoContainer.appendChild(todo);

            
        }
        
        // add event listeners for todo deletes
        const deleteTodos = document.getElementsByName('delete-todo');
        deleteTodos.forEach(del => del.addEventListener('click', _deleteTodo));
    }

    const addDropDown = () => {
        const addIcon = document.querySelector('.header-right');
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');
        dropdown.innerHTML = `
        <p id="add-p">Add Project</p>
        <p id="add-t">Add Todo</p>
        <p id="close-dropdown">Close</p>
        `;

        addIcon.appendChild(dropdown);
        
        const addP = document.getElementById('add-p');
        const addT = document.getElementById('add-t');
        const close = document.getElementById('close-dropdown');

        addP.addEventListener('click', () => {
            dropdown.remove();
            _addProject();
        });
        addT.addEventListener('click', () => {
            dropdown.remove();
            _addTodo();
        });
        close.addEventListener('click', () => {
            dropdown.remove();
        });
    }

    const _chooseProject = (e) => {
        projectChoice = e.currentTarget.id;
        renderToDos();
        
    }

    const _addProject = () => {
        const projectContainer = document.querySelector('.project-container');
        const newProject = document.createElement('div');
        newProject.classList.add('new-project');
        newProject.innerHTML = `
        <input id="p-title" type="text" placeholder="Title"></input>
        <input id="p-description" type="text" placeholder="Category"></input>
        <a id="execute-add"><i class="fas fa-arrow-circle-up"></i></a>
        `;
        projectContainer.appendChild(newProject);
        
        const executeAdd = document.getElementById('execute-add');
        executeAdd.addEventListener('click', () => {
            const input1Value = document.getElementById('p-title').value;
            const input2Value = document.getElementById('p-description').value;

            const project = objects.Project(input1Value, input2Value);
            projectsArray.push(project);
            newProject.remove();

            renderProjects();
        })
    }

    const _deleteProject = (e) => { // fix elements for event lsiterns
        const toDelete = e.currentTarget.parentElement.parentElement.parentElement;
        projectsArray.splice(toDelete, 1)

        renderProjects();
    }



    const _addTodo = () => {
        const toDoContainer = document.querySelector('.todo-container');
        const newToDo = document.createElement('div');
        newToDo.classList.add('new-todo');
        newToDo.innerHTML = `
        <input id="t-title" type="text" placeholder="Title"></input>
        <input id="t-due-date" type="text" placeholder="Due Date"></input>
        <input id="t-des" type="text" placeholder="Description"></input>
        <a id="execute-add"><i class="fas fa-arrow-circle-up"></i></a>
        `;
        toDoContainer.appendChild(newToDo);

        const executeAdd = document.getElementById('execute-add');
        executeAdd.addEventListener('click', () => {
            const input1Value = document.getElementById('t-title').value;
            const input2Value = document.getElementById('t-due-date').value;
            const input3Value = document.getElementById('t-des').value;

            const todo = objects.TODO(input1Value, input3Value, input2Value, false, false);
            
            let chosenProject = _isDefaultProject();
            chosenProject.currentProject.push(todo);
            newToDo.remove();

            renderToDos();
        });
    }

    const _deleteTodo = (e) => {
        let chosenProject = _isDefaultProject();
        const toDelete = e.target.parentElement.parentElement.parentElement.parentElement.id;
        chosenProject.currentProject.splice(toDelete, 1);

        renderToDos();
    }

    const _isDefaultProject = () => {
        let chosenProject;

        if (projectChoice === DEFAULT_PROJECT) {
            chosenProject = projectChoice;
        }
        else {
            chosenProject = projectsArray[projectChoice];
        }

        return chosenProject;
    }
    

    return {
        renderProjects,
        renderToDos,
        addDropDown
    }

    
})();

export {objects, scripts};