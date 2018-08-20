import React, { Component } from 'react';
import Select from 'react-select';
import { currentProject, theTaskWindow, addDeveloperToProject, currentDataTask, currentDataProject, removeDeveloperToProject, correctToken } from '../actions/index';
import {connect} from "react-redux";
import axios from "axios/index";
import { apiPrefix } from '../etc/config.json';
import CreateProject from './CreateProject';
import CreateTask from './CreateTask';
import TaskData from './TaskData';
import './MainPage.css';

class MainPage extends Component {
    constructor() {
        super();

        this.state = {
            multiSelectDevelopers: [],
            arrayOfRelationsBetweenTheProjectAndTheDeveloper: [],
            arrayOfRelationsBetweenTheTaskAndTheDeveloper: [],
            tasksOfTheCurrentDeveloper: [],
            idTasksForDeveloper: [],
            flagForFilterTasks: false,
            selectedOption: [],
            arrayForDisplayUsers: []
        };

        this.changeFlagForFilterTask = this.changeFlagForFilterTask.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios.get(`${apiPrefix}`)
            .then(res => {
                const multiSelectDevelopers = [];
                res.data.map((data) => {
                    multiSelectDevelopers.push({value: data.name, label: data.name, id_user: data.id});
                });

                this.setState({ multiSelectDevelopers: multiSelectDevelopers });
            });
        axios.get(`${apiPrefix}/projects`)
            .then(res => {
                const arrayNameProject = res.data;
                this.currentDataProject(arrayNameProject);
            });
        axios.get(`${apiPrefix}/tasks`)
            .then(res => {
                const arrayNameTask = res.data;
                this.currentDataTask(arrayNameTask);
            });

        axios.get(`${apiPrefix}/projectsusers`)
            .then(res => {
                const arrayOfRelationsBetweenTheProjectAndTheDeveloper = res.data;
                this.setState({ arrayOfRelationsBetweenTheProjectAndTheDeveloper: arrayOfRelationsBetweenTheProjectAndTheDeveloper });
            });

        axios.get(`${apiPrefix}/tasksusers`)
            .then(res => {
                const arrayOfRelationsBetweenTheTaskAndTheDeveloper = res.data;

                this.setState({ arrayOfRelationsBetweenTheTaskAndTheDeveloper: arrayOfRelationsBetweenTheTaskAndTheDeveloper });
            });
    }

    handleChange = (selectedOption, forRemove) => {
        let flagForDeleteUser = 0, indexForRemovePerson;

        let freshArrayOfRelationsBetweenTheProjectAndTheDeveloper = this.state.arrayOfRelationsBetweenTheProjectAndTheDeveloper;

        if(forRemove.action === "remove-value") {
            this.state.arrayOfRelationsBetweenTheProjectAndTheDeveloper.map((data, index) =>
                +this.props.currentProject._root.entries[0][1] === data.id_project && forRemove.removedValue.id_user === data.id_user ?
                    (indexForRemovePerson = index) && flagForDeleteUser++ : null);
        }

        if(flagForDeleteUser > 0) {
            removeDeveloperToProject(+this.props.currentProject._root.entries[0][1], forRemove.removedValue.id_user);
            freshArrayOfRelationsBetweenTheProjectAndTheDeveloper.splice(indexForRemovePerson, 1);
            this.setState({ arrayOfRelationsBetweenTheProjectAndTheDeveloper: freshArrayOfRelationsBetweenTheProjectAndTheDeveloper });
        } else {
            addDeveloperToProject(+this.props.currentProject._root.entries[0][1], selectedOption[selectedOption.length - 1].id_user);
            freshArrayOfRelationsBetweenTheProjectAndTheDeveloper.push({id_project: +this.props.currentProject._root.entries[0][1],
                id_user: selectedOption[selectedOption.length - 1].id_user});
            this.setState({ arrayOfRelationsBetweenTheProjectAndTheDeveloper: freshArrayOfRelationsBetweenTheProjectAndTheDeveloper });
        }
    };


    currentSelectedProject = event => {
        this.currentProject(event.target.value);
    };

    changeFlagForFilterTask() {
        this.state.idTasksForDeveloper = [];

        this.state.arrayOfRelationsBetweenTheTaskAndTheDeveloper.map((data) =>
            this.props.currentProject._root.entries[2][1].id == data.id_user ? this.state.idTasksForDeveloper.push(data.id_task) : null);
        this.state.flagForFilterTasks ? this.setState({flagForFilterTasks: false}) : this.setState({flagForFilterTasks: true});
    };

    logout() {
        localStorage.setItem('tokenUser', '');
        this.correctToken(false);
    }


    currentProject = (data) => this.props.dispatch(currentProject(data));
    theTaskWindow = (data) => this.props.dispatch(theTaskWindow(data));
    currentDataTask = (data) => this.props.dispatch(currentDataTask(data));
    currentDataProject = (data) => this.props.dispatch(currentDataProject(data));
    correctToken = (data) => this.props.dispatch(correctToken(data));

    render() {
        this.state.arrayForDisplayUsers = [];

        if (this.props.currentProject._root.entries[1][1].openTask) {

            if (this.state.multiSelectDevelopers.length > 0) {
                this.state.arrayOfRelationsBetweenTheProjectAndTheDeveloper.map((data) =>
                    +this.props.currentProject._root.entries[0][1] === data.id_project ? this.state.multiSelectDevelopers.map((data2) =>
                        data.id_user === data2.id_user ? this.state.arrayForDisplayUsers.push(data2) : null) : null);

                return (
                    <div className="main-page-block">
                        <button onClick={this.logout}>Logout</button>
                        <h1 className="main-title">Tracker</h1>

                        <div className="button-create-project-in-main-page">
                            {this.props.currentProject._root.entries[2][1].role === 'Manager' ? <CreateProject/> : null}
                        </div>
                        <div className="button-create-task-in-main-page">
                            <CreateTask/>
                        </div>

                        <br/>

                        <div className="projects-in-main-page">
                            Project name:
                        </div>
                        <select className="list-projects-in-main-page" onChange={this.currentSelectedProject}>
                            {this.props.currentProject._root.entries[2][1].role === 'Manager' ? this.props.currentProject._root.entries[5][1].map((data, i) =>
                                    <option key={i} value={data.id}>{data.project_name}</option>) :
                                this.state.arrayOfRelationsBetweenTheProjectAndTheDeveloper.map((data2) =>
                                    this.props.currentProject._root.entries[2][1].id == data2.id_user ?
                                        this.props.currentProject._root.entries[5][1].map((data3) => data2.id_project === data3.id ?
                                            <option value={data3.id}>{data3.project_name}</option> : null) : null)
                            }
                        </select>


                        {this.props.currentProject._root.entries[2][1].role === 'Manager' ? null :
                            <button onClick={this.changeFlagForFilterTask}>Task filter</button>}


                        <Select
                            options={this.state.multiSelectDevelopers}
                            value={this.state.arrayForDisplayUsers.map((data) => data)}
                            onChange={this.handleChange.bind(this)}
                            isMulti={true}
                        />


                        <ul className="list-tasks-in-main-page">
                            {this.props.currentProject._root.entries[4][1].map((data) => +this.props.currentProject._root.entries[0][1] === data.id_project
                                ? !this.state.flagForFilterTasks ?
                                    <li key={data.id}><a onClick={() => this.theTaskWindow(data)}>{data.task_name}</a>
                                    </li> :
                                    this.state.idTasksForDeveloper.map((data2) =>
                                        data2 === data.id ?
                                            <li><a onClick={() => this.theTaskWindow(data)}>{data.task_name}</a>
                                            </li> : null) : null)}
                        </ul>
                    </div>
                )
            } else {
                return null;
            }
        } else {
            return (
                <div>
                    <TaskData/>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentProject: state
    }
}

export default connect(mapStateToProps)(MainPage);