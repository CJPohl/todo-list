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
    const TODO = (title, des, dueDate, priority, checkStatus) => {
         
        
        return {
            title,
            des,
            dueDate,
            priority,
            checkStatus,
        }
    }

    return {
        Project,
        TODO
    }
})();

const scripts = (() => {
    let projectsArray = [];
    
    const DEFAULT_PROJECT = objects.Project('Default');
    projectsArray.push(DEFAULT_PROJECT);
    let projectChoice = DEFAULT_PROJECT;
    
    const randomProject1 = objects.Project('Coding');
    const randomProject2 = objects.Project('Lego');

    const todo1 = objects.TODO('Feed the Cats', 'Give the cats food', 'Tomorrow', false, false );
    const todo2 = objects.TODO('Feed asdfthe Cats', 'Give thasdfe cats food', 'Tomorrow', false, false );

    projectsArray.push(randomProject1);
    projectsArray.push(randomProject2);

    for (let i=0; i<2; i++) {
        projectsArray.push(randomProject1);
        projectsArray.push(randomProject2);
        randomProject1.currentProject.push(todo1);
        randomProject1.currentProject.push(todo2); 
    };
    
   


    const renderContent = () => {
        _renderProjects();
        _renderToDos();
    }
    
    // for all projects in project array, render to screen
    const _renderProjects = () => {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = '';

        for (let i=0; i<projectsArray.length; i++) {
            const project = document.createElement('div');
            project.classList.add('project');
            //project.setAttribute('id', `${i}`);
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
        }
        
        const projectLefts = document.querySelectorAll('.project-left');
        projectLefts.forEach(left => left.addEventListener('click', _chooseProject));
        
        const deleteProjects = document.getElementsByName('delete-project');
        deleteProjects.forEach(del => del.addEventListener('click', _deleteProject));
    }

    const _renderToDos = () => {
        const toDoContainer = document.querySelector('.todo-container');
        toDoContainer.innerHTML = '';
        let chosenProject = _isDefaultProject();

        let checkStatus;
        let priorityStatus;

        if (projectsArray.length === 0) {
            toDoContainer.innerHTML = '';
        }
        else {
            for (let i=0; i<chosenProject.currentProject.length; i++) {
                const todo = document.createElement('div');
                todo.classList.add('todo');
                todo.setAttribute('id', `${i}`);
                
                if (chosenProject.currentProject[i].checkStatus === false) {
                    checkStatus = "far fa-circle";
                }
                else {
                    checkStatus = "fas fa-circle";
                }
                
                if (chosenProject.currentProject[i].priority === false) {
                    priorityStatus = "fas fa-bell-slash";
                    console.log('hi');
                }
                else {
                    priorityStatus = "fas fa-bell";
                    console.log('sup');
                }
                
                todo.innerHTML = `
                <div class="todo-left">
                    <div><i class="${checkStatus}"></i></div>
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

                toDoContainer.appendChild(todo);

                
            }   
        }
        
        // add event listerns for priority button
        const bells = document.getElementsByName('priority-todo');
        bells.forEach(bell => bell.addEventListener('click', _changePriority));

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
        renderContent();
    }

    const returnDefault = () => {
        projectChoice = DEFAULT_PROJECT;
        renderContent();
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

            renderContent();
        })
    }

    const _deleteProject = (e) => { // fix elements for event lsiterns
        const toDelete = e.currentTarget.parentElement.parentElement.id;
        projectsArray.splice(toDelete, 1)
        renderContent();
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

            renderContent();
        });
    }

    const _changePriority = (e) => {
        let chosenProject = _isDefaultProject();
        const toChange = e.currentTarget.id
        const priorityBool = chosenProject.currentProject[toChange].priority;

        if (priorityBool === false) {
            chosenProject.currentProject[toChange].priority = true;
        }
        else{
            chosenProject.currentProject[toChange].priority = false;
            console.log('asdf');
        }

        renderContent();
    }

    const _deleteTodo = (e) => {
        let chosenProject = _isDefaultProject();
        const toDelete = e.target.parentElement.parentElement.parentElement.parentElement.id;
        chosenProject.currentProject.splice(toDelete, 1);

        renderContent();
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
        renderContent,
        addDropDown,
        returnDefault
    }

    
})();

export {objects, scripts};