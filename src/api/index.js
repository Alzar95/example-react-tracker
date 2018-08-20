import axios from 'axios';
import { apiPrefix } from '../etc/config.json';

export default {
    listUsers() {
        return axios.get(`${apiPrefix}`);
    },

    registrationUser(user) {
        return axios.post(`${apiPrefix}`, { user });
    },

    loginUser(user) {
        return axios.post(`${apiPrefix}/login`, { user });
    },

    searchToken(tokenForUser) {
        return axios.post(`${apiPrefix}/tokinforuser`, { tokenForUser });
    },

    createProject(project) {
        return axios.post(`${apiPrefix}/projects`, { project });
    },

    createTask(task) {
        return axios.post(`${apiPrefix}/tasks`, { task });
    },

    createComment(commentForTask) {
        return axios.post(`${apiPrefix}/comments`, { commentForTask });
    },

    removeComment(commentIdForTask) {
        return axios.post(`${apiPrefix}/commentsdelete`, { commentIdForTask });
    },

    changeTextComment(dataTask) {
        return axios.post(`${apiPrefix}/taskscomments`, { dataTask });
    },

    addDeveloperToProject(id_project, id_user) {
        return axios.post(`${apiPrefix}/projectsusers`, { id_project, id_user });
    },

    removeDeveloperToProject(id_project, id_user) {
        return axios.post(`${apiPrefix}/projectsusersdelete`, { id_project, id_user });
    },

    addDeveloperToTask(id_task, id_user) {
        return axios.post(`${apiPrefix}/tasksusers`, { id_task, id_user });
    },

    removeDeveloperToTask(id_task, id_user) {
        return axios.post(`${apiPrefix}/tasksusersdelete`, { id_task, id_user });
    },

    changeTaskStatus(taskStatus) {
        return axios.post(`${apiPrefix}/tasksstatus`, { taskStatus });
    },

    listTasks() {
        return axios.get(`${apiPrefix}/tasks`);
    }
}