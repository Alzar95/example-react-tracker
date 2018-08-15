import api from '../api/index';
import * as reducerType from '../unit/reducerType';

export let currentProject = (selectedProject) => {
    return {
        type: reducerType.SELECTED_PROJECT,
        payload: { selectedProject }
    }
};

export const registrationUser = (user) => {
    return api.registrationUser(user)
        .then(res => {
            console.log(res.data);
        })
};

export const loginUser = (user) => {
        return api.loginUser(user)
            .then(res => {
                return res.data;
            })
};

export const searchToken = (tokenForUser) => {
    return api.searchToken(tokenForUser)
        .then(res => {
            return res.data;
        })
};

export const createProject = (project) => {
    return api.createProject(project)
        .then(res => {
            console.log(res.data);
        })
};

export const createTask = (task) => {
    return api.createTask(task)
        .then(res => {
            console.log(res.data);
        })
};

export const addDeveloperToProject = (id_project, id_user) => {
    return api.addDeveloperToProject(id_project, id_user)
        .then(res => {
            console.log(res.data);
        })
};

export const removeDeveloperToProject = (id_project, id_user) => {
    return api.removeDeveloperToProject(id_project, id_user)
        .then(res => {
            console.log(res.data);
        })
};

export const addDeveloperToTask = (id_task, id_user) => {
    return api.addDeveloperToTask(id_task, id_user)
        .then(res => {
            console.log(res.data);
        })
};

export const removeDeveloperToTask = (id_task, id_user) => {
    return api.removeDeveloperToTask(id_task, id_user)
        .then(res => {
            console.log(res.data);
        })
};

export const createComment = (commentForTask) => {
    return api.createComment(commentForTask)
        .then(res => {
            console.log(res.data);
        })
};

export const removeComment = (commentIdForTask) => {
    return api.removeComment(commentIdForTask)
        .then(res => {
            console.log(res.data);
        })
};

export const changeTextComment = (dataTask) => {
    return api.changeTextComment(dataTask)
        .then(res => {
            console.log(res.data);
        })
};

export const changeTaskStatus = (taskStatus) => {
    return api.changeTaskStatus(taskStatus)
        .then(res => {
            console.log(res.data);
        })
};

export let  theTaskWindow = (taskData, openTask = false) => {
    return {
        type: reducerType.OPEN_THE_TASK_WINDOW,
        payload: { openTask, taskData }
    };
};

export let  showTheMainPageWindow = (openTask = true) => {
    return {
        type: reducerType.OPEN_THE_TASK_WINDOW,
        payload: { openTask }
    };
};

export let  currentUser = (dataUser) => {
    return {
        type: reducerType.CURRENT_USER,
        payload: { dataUser }
    };
};

export let  currentDataTask = (dataTask) => {
    return {
        type: reducerType.CURRENT_TASK_DATA,
        payload: { dataTask }
    };
};

export let  currentDataProject = (dataProject) => {
    return {
        type: reducerType.CURRENT_PROJECT_DATA,
        payload: { dataProject }
    };
};

export let  correctToken = (correctToken) => {
    return {
        type: reducerType.CORRECT_TOKEN,
        payload: { correctToken }
    };
};