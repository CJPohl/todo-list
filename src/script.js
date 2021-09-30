const objects = (() => {
    // project factory
    const Project = (title) => {
        const currentProject = []
        return {
            title,
            currentProject
        }
    }

    // todo factory
    const TODO = (title, des, dueDate, priority, status) => {        
        return {
            title,
            des,
            dueDate,
            priority,
            status,
        }
    }

    return {
        Project,
        TODO
    }
})();


// scripts for all front-end dynamic content
const scripts = (() => {
    // main project array
    let projectsArray = [];
    
    // create default project that appears on startup
    const DEFAULT_PROJECT = objects.Project('Default');
    projectsArray.push(DEFAULT_PROJECT);
    let projectChoice = DEFAULT_PROJECT;
   
    // render all dynamic content
    const renderContent = () => {
        _renderTitle();
        _renderProjects();
        _renderTodos();
    }

    // render todo column title
    const _renderTitle = () => {
        let chosenProject = _isDefaultProject();
        const todoTitle = document.getElementById('todo-column-title');
        todoTitle.innerHTML= `${chosenProject.title}`;
    }
    
    // for all projects in project array, render to screen
    const _renderProjects = () => {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = '';

        for (let i=0; i<projectsArray.length; i++) {
            const project = document.createElement('div');
            project.classList.add('project');
            project.innerHTML = `
            <div id="${i}" class="project-left">
                <p>${projectsArray[i].title}</p>
            </div>
            <div id="${i}" class="project-right">
                <div><a name="edit-project"><i class="fas fa-edit"></i></a></div>
                <div><a name="delete-project"><i class="fas fa-times"></i></a></div>
            </div>
            `;

            projectContainer.appendChild(project);

            _addProjectListeners();
        }
        
        
        
    }

    // project event listeners
    const _addProjectListeners = () => {
        const projectLefts = document.querySelectorAll('.project-left');
        projectLefts.forEach(left => left.addEventListener('click', _chooseProject));

        const editProjects = document.getElementsByName('edit-project');
        editProjects.forEach(edit => edit.addEventListener('click', (e) => {
            if ((document.querySelector('.new-project') === null) && (document.querySelector('.edit-box') === null)) {
                _editProject(e);
            }
        }));
        
        const deleteProjects = document.getElementsByName('delete-project');
        deleteProjects.forEach(del => del.addEventListener('click', _deleteProject));
    }

    // render all todos in chosen project's array attribute
    const _renderTodos = () => {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        let chosenProject = _isDefaultProject();

        let checkStatus;
        let priorityStatus;

        if (projectsArray.length === 0) {
            todoContainer.innerHTML = '';
        }
        else {
            for (let i=0; i<chosenProject.currentProject.length; i++) {
                const todo = document.createElement('div');
                todo.classList.add('todo');
                todo.setAttribute('id', `${i}`);
                
                if (chosenProject.currentProject[i].status === false) {
                    checkStatus = "far fa-circle";
                }
                else {
                    checkStatus = "fas fa-circle";
                }
                
                if (chosenProject.currentProject[i].priority === false) {
                    priorityStatus = "fas fa-bell-slash";
                }
                else {
                    priorityStatus = "fas fa-bell";
                }
                
                todo.innerHTML = `
                <div class="todo-left">
                    <div><a name="status"><i class="${checkStatus}"></i></a></div>
                    <p class="todo-title-text">${chosenProject.currentProject[i].title}</p>
                    <p class="todo-faded-text">${chosenProject.currentProject[i].dueDate}</p>
                    <p class="todo-des-text">${chosenProject.currentProject[i].des}</p>
                    <div><a id="${i}" name="priority-todo"><i class="${priorityStatus}"></i></a></div>
                </div>
                <div class="todo-right">
                    <div><a name="edit-todo"><i class="fas fa-edit"></i></a></div>
                    <div><a name="delete-todo"><i class="fas fa-times"></i></a></div>
                </div>
                `;

                todoContainer.appendChild(todo);

                
            }
            _addTodoListeners();   
        }
        
    }

    // add listeners for each todo
    const _addTodoListeners = () => {
        const statuses = document.getElementsByName('status');
        statuses.forEach(stat => stat.addEventListener('click', _changeStatus));
        
        const bells = document.getElementsByName('priority-todo');
        bells.forEach(bell => bell.addEventListener('click', _changePriority));

        const editTodos = document.getElementsByName('edit-todo');
        editTodos.forEach(edit => edit.addEventListener('click', (e) => {
            if ((document.querySelector('.dropdown') === null) && (document.querySelector('.edit-box') === null) && (document.querySelector('.new-todo') === null)) {
                _editTodo(e);
            }
        }));
        
        const deleteTodos = document.getElementsByName('delete-todo');
        deleteTodos.forEach(del => del.addEventListener('click', _deleteTodo));
    }

    // add a drop down when adding new content
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
        
        _addDropDownListeners(dropdown);
       
    }

    // add listeners to dropdown menu selections
    const _addDropDownListeners = (dropdown) => {
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

    // when user selects project, show its contents
    const _chooseProject = (e) => {
        projectChoice = e.currentTarget.id;
        renderContent();
    }

    // return to default project when home button is pressed
    const returnDefault = () => {
        projectChoice = DEFAULT_PROJECT;
        renderContent();
    }

    // add a new project to array
    const _addProject = () => {
        const projectContainer = document.querySelector('.project-container');
        const newProject = document.createElement('div');
        newProject.classList.add('edit-box');
        newProject.innerHTML = `
        <input id="p-title" type="text" placeholder="Title"></input>
        <a id="execute-add"><i class="fas fa-arrow-circle-up"></i></a>
        `;
        projectContainer.appendChild(newProject);
        
        const executeAdd = document.getElementById('execute-add');
        
        executeAdd.addEventListener('click', () => {
            const input1Value = document.getElementById('p-title').value;
            const project = objects.Project(input1Value);
            projectsArray.push(project);
            newProject.remove();
            if (document.querySelector('.edit-box') === null) {
                renderContent();
            }
        })
    }

    // remove project from array
    const _deleteProject = (e) => {
        const toDelete = e.currentTarget.parentElement.parentElement.id;
        projectsArray.splice(toDelete, 1)
        projectChoice = DEFAULT_PROJECT;

        renderContent();
    }
    
    // edit array title
    const _editProject = (e) => {
        const projectContainer = document.querySelector('.project-container');
        const editProject = document.createElement('div');
        editProject.classList.add('edit-box');
        editProject.innerHTML = `
        <input id="p-title" type="text" placeholder="Title"></input>
        <a id="execute"><i class="fas fa-arrow-circle-up"></i></a>
        `;
        projectContainer.appendChild(editProject);

        const project = e.currentTarget.parentElement.parentElement.id
        
        const executeEdit = document.getElementById('execute');

        executeEdit.addEventListener('click', () => {
            const input1Value = document.getElementById('p-title').value;
            projectsArray[project].title = input1Value;
            editProject.remove();

            renderContent();
        });
    }

    // add a todo to project's array
    const _addTodo = () => {
        const todoContainer = document.querySelector('.todo-container');
        const newToDo = document.createElement('div');
        newToDo.classList.add('edit-box');
        newToDo.innerHTML = `
        <input id="t-title" type="text" placeholder="Title"></input>
        <input id="t-due-date" type="text" placeholder="Due Date"></input>
        <input id="t-des" type="text" placeholder="Description"></input>
        <a id="execute-add"><i class="fas fa-arrow-circle-up"></i></a>
        `;
        todoContainer.appendChild(newToDo);

        const executeAdd = document.getElementById('execute-add');
        
        executeAdd.addEventListener('click', () => {
            const input1Value = document.getElementById('t-title').value;
            const input2Value = document.getElementById('t-due-date').value;
            const input3Value = document.getElementById('t-des').value;

            const todo = objects.TODO(input1Value, input3Value, input2Value, false, false);
            
            let chosenProject = _isDefaultProject();
            chosenProject.currentProject.push(todo);
            newToDo.remove();

            renderContent();
        });
    }

    // change todo status
    const _changeStatus = (e) => {
        let chosenProject = _isDefaultProject();
        const toChange = e.currentTarget.parentElement.parentElement.parentElement.id
        const priorityBool = chosenProject.currentProject[toChange].status;

        if (priorityBool === false) {
            chosenProject.currentProject[toChange].status = true;
        }
        else{
            chosenProject.currentProject[toChange].status = false;
        }

        renderContent();
    }

    // change todo priority
    const _changePriority = (e) => {
        let chosenProject = _isDefaultProject();
        const toChange = e.currentTarget.id
        const priorityBool = chosenProject.currentProject[toChange].priority;

        if (priorityBool === false) {
            chosenProject.currentProject[toChange].priority = true;
        }
        else{
            chosenProject.currentProject[toChange].priority = false;
        }

        renderContent();
    }

    // change a todo's object attributes
    const _editTodo = (e) => {
        const todoContainer = document.querySelector('.todo-container');
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');
        dropdown.innerHTML = `
        <p id="edit-t">Edit Title</p>
        <p id="edit-dd">Edit Due Date</p>
        <p id="edit-des">Edit Description</p>
        `;

        todoContainer.appendChild(dropdown);

        const todo = e.currentTarget.parentElement.parentElement.parentElement.id;
        let chosenProject = _isDefaultProject();
        let project = chosenProject.currentProject[todo];
        
        const editT = document.getElementById('edit-t');
        const editDD = document.getElementById('edit-dd');
        const editDes = document.getElementById('edit-des');

        editT.addEventListener('click', () => {
            let mode = 'title';
            _executeTodoEdit(mode, project);
            dropdown.remove();
            
        });
        editDD.addEventListener('click', () => {
            let mode = 'dueDate';
            _executeTodoEdit(mode, project);
            dropdown.remove();
            
        });
        editDes.addEventListener('click', () => {
            let mode = 'des';
            _executeTodoEdit(mode, project);
            dropdown.remove();
        });
    }

    // when user hits the execute button, changes are made to the object's array
    const _executeTodoEdit = (mode, project) => {
        const todoContainer = document.querySelector('.todo-container');
        const editTodo = document.createElement('div');
        editTodo.classList.add('edit-box');
        editTodo.innerHTML = `
        <input id="${mode}" type="text"></input>
        <a id="execute"><i class="fas fa-arrow-circle-up"></i></a>
        `;
        todoContainer.appendChild(editTodo);

        const executeEdit = document.getElementById('execute');
        executeEdit.addEventListener('click', () => {
            const input1Value = document.getElementById(`${mode}`).value;
            if (mode === 'title') {
               project.title = input1Value; 
            }
            else if (mode === 'dueDate') {
                project.dueDate = input1Value; 
            }
            else {
                project.des = input1Value; 
            }
            
            editTodo.remove();

            renderContent();
        });
    }

    // remove todo from object's array
    const _deleteTodo = (e) => {
        let chosenProject = _isDefaultProject();
        const toDelete = e.target.parentElement.parentElement.parentElement.parentElement.id;
        chosenProject.currentProject.splice(toDelete, 1);

        renderContent();
    }

    // determine current project
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
        renderContent,
        addDropDown,
        returnDefault
    }
})();

export {objects, scripts};