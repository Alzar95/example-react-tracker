import * as reducerType from '../../unit/reducerType';

let initialState = [];

const currentTaskData = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.CURRENT_TASK_DATA:
            return action.payload.dataTask;
        default:
            return state;
    }
};

export default currentTaskData;