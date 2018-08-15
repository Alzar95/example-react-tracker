import { combineReducers } from 'redux-immutable';
import selectProject from './selectProject';
import currentUser from './currentUser';
import correctLogin from './correctLogin';
import taskWindowIsOpen from './taskWindowIsOpen';
import currentTaskData from './currentTaskData';
import currentProjectData from './currentProjectData';
import correctToken from './correctToken';

const rootReducer = combineReducers({
    selectProject,
    taskWindowIsOpen,
    currentUser,
    correctLogin,
    currentTaskData,
    currentProjectData,
    correctToken
});

export default rootReducer;