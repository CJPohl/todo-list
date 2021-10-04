const lS = (() => {
    const updateLS = (projectsArray)  => {
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }

    const parseLS = () => {
        const storedProjects = JSON.parse(localStorage.getItem('projects'));

        return storedProjects;
    }
    
    return {
        updateLS,
        parseLS
    }
})();

export {lS};