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

export {objects};