import * as reducerType from '../../unit/reducerType';

let initialState = 0;

const selectProject = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.SELECTED_PROJECT:
            return action.payload.selectedProject;
        default:
            return state;
    }
};

export default selectProject;