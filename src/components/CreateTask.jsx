import React, { Component } from 'react';
import { createTask, currentDataTask } from '../actions/index';
import Modal from 'react-modal';
import {connect} from "react-redux";
import './CreateTask.css';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class CreateTask extends Component {
    constructor() {
        super();

        this.state = {
            modalAddProjectIsOpen: false,
            modalAddTaskIsOpen: false,
            nameProject: '',
            taskName: '',
            taskDescription: '',
            taskStatus: 'waiting',
            selectedProject: '',
            arrayNameProject: [],
            arrayNameTask: [],
            multiSelectDevelopers: []
        };

        this.openModalForCreateTask = this.openModalForCreateTask.bind(this);
        this.afterOpenModalForCreateTask = this.afterOpenModalForCreateTask.bind(this);
        this.closeModalForCreateTask = this.closeModalForCreateTask.bind(this);
    }

    openModalForCreateTask() {
        this.setState({modalAddTaskIsOpen: true});
    }

    afterOpenModalForCreateTask() {
        this.subtitle.style.color = '#f00';
    }

    closeModalForCreateTask() {
        this.setState({ modalAddTaskIsOpen: false });
    }

    handleChangeTaskName = event => {
        this.setState({ taskName: event.target.value });
    };

    handleChangeTaskDescription = event => {
        this.setState({ taskDescription: event.target.value });
    };

    handleChangeTaskStatus = event => {
        this.setState({ taskStatus: event.target.value });
    };

    handleSubmitTask = event => {
        event.preventDefault();

        let idTask;

        if(this.props.currentProject._root.entries[4][1].length > 0) {
            idTask = this.props.currentProject._root.entries[4][1][this.props.currentProject._root.entries[4][1].length - 1].id + 1
        } else {
            idTask = 1;
        }

        const task = {
            id: idTask,
            task_name: this.state.taskName,
            task_description: this.state.taskDescription,
            status: this.state.taskStatus,
            id_project: +this.props.currentProject._root.entries[0][1]
        };

        const taskOnServer = {
            taskName: this.state.taskName,
            taskDescription: this.state.taskDescription,
            taskStatus: this.state.taskStatus,
            selectedProject: this.props.currentProject._root.entries[0][1]
        };

        let joinedListCommentsForTask = this.props.currentProject._root.entries[4][1].concat(task);
        this.currentDataTask(joinedListCommentsForTask);

       createTask(taskOnServer);

        document.getElementsByClassName('field-for-create-task-name')[0].value = '';
        document.getElementsByClassName('field-for-create-task-description')[0].value = '';
    };

    currentDataTask = (data) => this.props.dispatch(currentDataTask(data));

    render() {
        return (
            <div>
                <button className="button-create-task" onClick={this.openModalForCreateTask} >Create tasks</button>

                <Modal
                    isOpen={this.state.modalAddTaskIsOpen}
                    onAfterOpen={this.afterOpenModalForCreateTask}
                    onRequestClose={this.closeModalForCreateTask}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Modal for create task</h2>
                    <button onClick={this.closeModalForCreateTask}>close</button>

                    <form method="post" action="/tasks" onSubmit={this.handleSubmitTask}>
                        <label>
                            Task name: <input type="text" className="field-for-create-task-name" placeholder="Task name" onChange={this.handleChangeTaskName}/>
                        </label>
                        <label>
                            Task description: <textarea name="description" className="field-for-create-task-description" placeholder="Description" onChange={this.handleChangeTaskDescription}/>
                        </label>
                        <label>
                            Choose status:
                            <select onClick={this.handleChangeTaskStatus}>
                                <option selected value="waiting">waiting</option>
                                <option value="implementation">implementation</option>
                                <option value="verifying">verifying</option>
                                <option value="releasing">releasing</option>
                            </select>
                        </label>

                        <input type="submit" value="Add task"/>
                    </form>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentProject: state
    }
}

export default connect(mapStateToProps)(CreateTask);