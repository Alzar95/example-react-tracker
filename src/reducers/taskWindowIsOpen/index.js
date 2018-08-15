import * as reducerType from '../../unit/reducerType';

let initialState = {openTask: true, taskData: {}};

const taskWindowIsOpen = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.OPEN_THE_TASK_WINDOW:
            return { openTask: action.payload.openTask, taskData: action.payload.taskData };
        default:
            return state;
    }
};

export default taskWindowIsOpen;