import * as reducerType from '../../unit/reducerType';

let initialState = [];

const currentTaskData = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.CURRENT_PROJECT_DATA:
            return action.payload.dataProject;
        default:
            return state;
    }
};

export default currentTaskData;