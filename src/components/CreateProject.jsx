import React, { Component } from 'react';
import { createProject, currentDataProject } from '../actions/index';
import Modal from 'react-modal';
import './CreateProject.css';
import {connect} from "react-redux";

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

class CreateProject extends Component {
    constructor() {
        super();

        this.state = {
            modalAddProjectIsOpen: false,
            modalAddTaskIsOpen: false,
            nameProject: '',
            taskName: '',
            taskDescription: '',
            taskStatus: '',
            selectedProject: '',
            arrayNameProject: [],
            arrayNameTask: [],
            multiSelectDevelopers: []
        };

        this.openModalForCreateProject = this.openModalForCreateProject.bind(this);
        this.afterOpenModalForCreateProject = this.afterOpenModalForCreateProject.bind(this);
        this.closeModalForCreateProject = this.closeModalForCreateProject.bind(this);
    }

    openModalForCreateProject() {
        this.setState({modalAddProjectIsOpen: true});
    }

    afterOpenModalForCreateProject() {
        this.subtitle.style.color = '#f00';
    }

    closeModalForCreateProject() {
        this.setState({modalAddProjectIsOpen: false});
    }

    handleChangeNameProject = event => {
        this.setState({ nameProject: event.target.value });
    };

    handleSubmitProject = event => {
        event.preventDefault();

        let idProject;

        if(this.props.currentProject._root.entries[5][1].length > 0) {
            idProject = this.props.currentProject._root.entries[5][1][this.props.currentProject._root.entries[5][1].length - 1].id + 1;
        } else {
            idProject = 1;
        }

        const project = {
            id: idProject,
            project_name: this.state.nameProject
        };

        const projectOnServer = {
            nameProject: this.state.nameProject
        };

        let joinedArrayNameProject = this.props.currentProject._root.entries[5][1].concat(project);
        this.currentDataProject(joinedArrayNameProject);

        createProject(projectOnServer);

        document.getElementsByClassName('field-for-create-project')[0].value = '';
    };

    currentDataProject = (data) => this.props.dispatch(currentDataProject(data));

    render() {
        return (
            <div>
                <button className="button-create-project" onClick={this.openModalForCreateProject}>Create project</button>

                <Modal
                    isOpen={this.state.modalAddProjectIsOpen}
                    onAfterOpen={this.afterOpenModalForCreateProject}
                    onRequestClose={this.closeModalForCreateProject}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Modal for create project</h2>
                    <button onClick={this.closeModalForCreateProject}>close</button>

                    <form method="post" action="/projects" onSubmit={this.handleSubmitProject}>
                        <label>
                            Add project: <input type="text" className="field-for-create-project" placeholder="New project name" onChange={this.handleChangeNameProject}/>
                        </label>
                        <input type="submit" value="Add project"/>
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

export default connect(mapStateToProps)(CreateProject);