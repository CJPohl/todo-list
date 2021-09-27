const toDoLists = (() => {
    // array that holds all projects
    const allProjects = [];
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

export {toDoLists};