import React, { Component } from 'react';
import Select from 'react-select';
import { currentProject, addDeveloperToTask, createComment, changeTaskStatus, removeComment, changeTextComment, showTheMainPageWindow, removeDeveloperToTask } from '../actions/index';
import {connect} from "react-redux";
import axios from "axios/index";
import Icon from 'react-icons-kit';
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft';
import './TaskData.css';
import {apiPrefix} from '../etc/config.json';

class TaskData extends Component {
    constructor() {
        super();

        this.state = {
            commentForTask: '',
            listCommentsForTask: [],
            arrayNameProject: [],
            arrayNameTask: [],
            multiSelectDevelopers: [],
            developersFromProjectusers: [],
            multiSelectDevelopersForTask: [],
            arrayOfRelationsBetweenTheTaskAndTheDeveloper: [],
            isEditComment: false,
            currentIdComment: -1,
            newCommentForTask: '',
            flagForNewComment: false,
            idRemovedComment: [],
            arrayForDisplayUsers: []
        };

        this.onEditComment = this.onEditComment.bind(this);
        this.onAfterEditComment = this.onAfterEditComment.bind(this);
        this.currentIdComment = this.currentIdComment.bind(this);
        this.addInListCommentsForTask = this.addInListCommentsForTask.bind(this);
    }

    componentDidMount() {
        axios.get(`${apiPrefix}/projects`)
            .then(res => {
                const arrayNameProject = res.data;
                this.setState({ arrayNameProject: arrayNameProject });
            });
        axios.get(`${apiPrefix}/tasks`)
            .then(res => {
                const arrayNameTask = res.data;
                this.setState({ arrayNameTask: arrayNameTask });
            });

        axios.get(`${apiPrefix}/projectsusers`)
            .then(res => {
                const multiSelectDevelopers = res.data;

                multiSelectDevelopers.map((data) =>
                    data.id_project === this.props.currentProject._root.entries[1][1].taskData.id_project ?
                        this.state.multiSelectDevelopers.push(data) : null);
            });

        axios.get(`${apiPrefix}/tasksusers`)
            .then(res => {
                const arrayOfRelationsBetweenTheTaskAndTheDeveloper = res.data;

                this.setState({ arrayOfRelationsBetweenTheTaskAndTheDeveloper: arrayOfRelationsBetweenTheTaskAndTheDeveloper });
            });

        axios.get(`${apiPrefix}`)
            .then(res => {
                const multiSelectDevelopersForTask = [];

                res.data.map((data) =>
                    this.state.multiSelectDevelopers.map((data2) =>
                    data.id === data2.id_user ? multiSelectDevelopersForTask.push({label: data.name, value:  data.name, id_user: data.id}) : null)
                );

                this.setState({ multiSelectDevelopersForTask: multiSelectDevelopersForTask });
            });

        axios.get(`${apiPrefix}/comments`)
            .then(res => {
                const listCommentsForTask = res.data;

                this.setState({ listCommentsForTask: listCommentsForTask });
            });
    }

    handleChange = (selectedOption, forRemove) => {
        let flagForDeleteUser = 0, indexForRemovePerson;

        let freshArrayOfRelationsBetweenTheTaskAndTheDeveloper = this.state.arrayOfRelationsBetweenTheTaskAndTheDeveloper;

        if(forRemove.action === "remove-value") {
            this.state.arrayOfRelationsBetweenTheTaskAndTheDeveloper.map((data, index) =>
                +this.props.currentProject._root.entries[1][1].taskData.id === data.id_task && forRemove.removedValue.id_user === data.id_user ?
                    (indexForRemovePerson = index) && flagForDeleteUser++ : null);
        }

        if(flagForDeleteUser > 0) {
            removeDeveloperToTask(+this.props.currentProject._root.entries[1][1].taskData.id, forRemove.removedValue.id_user);
            freshArrayOfRelationsBetweenTheTaskAndTheDeveloper.splice(indexForRemovePerson, 1);
            this.setState({ arrayOfRelationsBetweenTheTaskAndTheDeveloper: freshArrayOfRelationsBetweenTheTaskAndTheDeveloper });
        } else {
            addDeveloperToTask(+this.props.currentProject._root.entries[1][1].taskData.id, selectedOption[selectedOption.length - 1].id_user);
            freshArrayOfRelationsBetweenTheTaskAndTheDeveloper.push({id_task: +this.props.currentProject._root.entries[1][1].taskData.id,
                id_user: selectedOption[selectedOption.length - 1].id_user});
            this.setState({ arrayOfRelationsBetweenTheTaskAndTheDeveloper: freshArrayOfRelationsBetweenTheTaskAndTheDeveloper });
        }
    };

    onEditComment(currentId) {
        this.setState({isEditComment: true, currentIdComment: currentId})
    }

    onAfterEditComment() {
        this.setState({isEditComment: false, flagForNewComment: true})
    }

    currentIdComment(idComment) {
        this.setState({isEditComment: idComment})
    }

    addInListCommentsForTask(data) {
        this.setState({listCommentsForTask: data});
    }

    removeCurrentComment = (commentIdForTask) => {
        removeComment(commentIdForTask);

        let index;

        let newFreshListCommentsForTask = [...this.state.listCommentsForTask];

        this.state.listCommentsForTask.map((data, i) => data.id === commentIdForTask ?
            index = i : null);

        newFreshListCommentsForTask.splice(index, 1);

        this.setState({listCommentsForTask: newFreshListCommentsForTask});
    };

    handleChangeCommentForTask = event => {
        this.setState({ commentForTask: event.target.value });
    };

    handleChangeNewCommentForTask = event => {
        this.setState({ newCommentForTask: event.target.value });
    };

    currentProject = (data) => this.props.dispatch(currentProject(data));

    handleSubmitCommentForTask = event => {
        event.preventDefault();

        let idForTaskComment;

        if(this.state.listCommentsForTask.length > 0) {
            idForTaskComment = this.state.listCommentsForTask[this.state.listCommentsForTask.length - 1].id + 1;
        } else {
            idForTaskComment = 1;
        }

        const commentForTask = {
            id: idForTaskComment,
            comment_text: this.state.commentForTask,
            id_task: this.props.currentProject._root.entries[1][1].taskData.id,
            user_name: this.props.currentProject._root.entries[2][1].name,
            role_user: this.props.currentProject._root.entries[2][1].role
        };

        const commentForTaskOnServer = {
            comment_text: this.state.commentForTask,
            id_task: this.props.currentProject._root.entries[1][1].taskData.id,
            user_name: this.props.currentProject._root.entries[2][1].name,
            role_user: this.props.currentProject._root.entries[2][1].role
        };

        let joined = this.state.listCommentsForTask.concat(commentForTask);
        this.setState({listCommentsForTask: joined});
        this.forceUpdate();

        createComment(commentForTaskOnServer);

        document.getElementsByClassName('field-for-create-comment-for-task')[0].value = '';
    };

    handleSubmitTaskStatus = event => {
       const taskStatus = event.target.value;

       const dataTask = {
           taskStatus: taskStatus,
           idTask: +this.props.currentProject._root.entries[1][1].taskData.id
       };

        changeTaskStatus(dataTask);
    };

    onEditSubmit = event => {
        event.preventDefault();

        const dataTask = {
            taskNewComment: this.state.newCommentForTask,
            idComment: this.state.currentIdComment
        };

        this.onAfterEditComment();

        changeTextComment(dataTask);
    };

    showTheMainPageWindow = () => this.props.dispatch(showTheMainPageWindow());

    render() {
        this.state.arrayForDisplayUsers = [];

        this.state.idRemovedComment.map((data) => this.state.listCommentsForTask.map((data2) => data === data2.id));

        this.state.arrayOfRelationsBetweenTheTaskAndTheDeveloper.map((data) =>
            +this.props.currentProject._root.entries[1][1].taskData.id === data.id_task ? this.state.multiSelectDevelopersForTask.map((data2) =>
                data.id_user === data2.id_user ? this.state.arrayForDisplayUsers.push(data2) : null) : null);

        return (
            <div className="task-page-block">
                <button className="back-button-on-login-in-task-data" onClick={() => this.showTheMainPageWindow()}>
                    <Icon size={32} icon={circleLeft}/></button>
                <h1 className="task-title">{this.props.currentProject._root.entries[1][1].taskData.task_name}</h1>
                <form method="post">
                    <label>
                        <p>Status: {this.props.currentProject._root.entries[1][1].taskData.status}</p>
                        <select className="list-status-in-task-data" onClick={this.handleSubmitTaskStatus}>
                            <option>waiting</option>
                            <option>implementation</option>
                            <option>verifying</option>
                            <option>releasing</option>
                        </select>
                    </label>
                </form>

                <Select
                    options={this.state.multiSelectDevelopersForTask}
                    value={this.state.arrayForDisplayUsers.map((data) => data)}
                    onChange={this.handleChange.bind(this)}
                    isMulti={true}
                />

                <p>Description: {this.props.currentProject._root.entries[1][1].taskData.task_description}</p>

                <form method="post" className="submit-form-for-write-comment-for-task"
                      onSubmit={this.handleSubmitCommentForTask}>
                    <label>
                        Write comment: <textarea rows={5} name="comment"
                                                 className="field-for-create-comment-for-task"
                                                 placeholder="Comment..."
                                                 onChange={this.handleChangeCommentForTask}/>
                    </label>

                    <input type="submit" value="Add comment"/>
                </form>


                <ul className="list-comments-in-task">
                    {this.state.listCommentsForTask.map((data) => data.id_task === this.props.currentProject._root.entries[1][1].taskData.id ?
                        <li>
                            <h3><strong>{data.user_name}</strong> ({data.role_user})</h3>
                            {
                                this.state.isEditComment && this.state.currentIdComment === data.id ?
                                    (
                                        <form method="post" onSubmit={this.onEditSubmit}>
                                                <textarea name="comment"
                                                          onChange={this.handleChangeNewCommentForTask}>{data.comment_text}</textarea>
                                            <input type="submit" value="Save"/>
                                        </form>

                                    ) : (
                                        <div>
                                            <div className="comment-text-in-task-data">
                                                {this.state.flagForNewComment && (this.state.currentIdComment === data.id) ?
                                                    this.state.newCommentForTask : data.comment_text}
                                            </div>
                                            <button className="button-edit-in-task-data"
                                                    onClick={() => this.onEditComment(data.id)}>Edit
                                            </button>
                                            <button className="button-delete-in-task-data"
                                                    onClick={() => this.removeCurrentComment(data.id)}>Delete
                                            </button>
                                        </div>
                                    )
                            }
                        </li> : null)}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentProject: state
    }
}

export default connect(mapStateToProps)(TaskData);