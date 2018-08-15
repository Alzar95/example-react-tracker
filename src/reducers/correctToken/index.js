import * as reducerType from '../../unit/reducerType';

let initialState = false;

const correctToken = (state = initialState, action) => {
    switch(action.type) {
        case reducerType.CORRECT_TOKEN:
            return action.payload.correctToken;
        default:
            return state;
    }
};

export default correctToken;