import axios from 'axios';

export default {
    listUsers() {
        return axios.get('http://localhost:7000');
    },

    registrationUser(user) {
        return axios.post('http://localhost:7000', { user });
    },

    loginUser(user) {
        return axios.post('http://localhost:7000/login', { user });
    },

    searchToken(tokenForUser) {
        return axios.post('http://localhost:7000/tokinforuser', { tokenForUser });
    },

    createProject(project) {
        return axios.post('http://localhost:7000/projects', { project });
    },

    createTask(task) {
        return axios.post('http://localhost:7000/tasks', { task });
    },

    createComment(commentForTask) {
        return axios.post('http://localhost:7000/comments', { commentForTask });
    },

    removeComment(commentIdForTask) {
        return axios.post('http://localhost:7000/commentsdelete', { commentIdForTask });
    },

    changeTextComment(dataTask) {
        return axios.post('http://localhost:7000/taskscomments', { dataTask });
    },

    addDeveloperToProject(id_project, id_user) {
        return axios.post('http://localhost:7000/projectsusers', { id_project, id_user });
    },

    removeDeveloperToProject(id_project, id_user) {
        return axios.post('http://localhost:7000/projectsusersdelete', { id_project, id_user });
    },

    addDeveloperToTask(id_task, id_user) {
        return axios.post('http://localhost:7000/tasksusers', { id_task, id_user });
    },

    removeDeveloperToTask(id_task, id_user) {
        return axios.post('http://localhost:7000/tasksusersdelete', { id_task, id_user });
    },

    changeTaskStatus(taskStatus) {
        return axios.post('http://localhost:7000/tasksstatus', { taskStatus });
    },

    listTasks() {
        return axios.get('http://localhost:7000/tasks');
    }
}